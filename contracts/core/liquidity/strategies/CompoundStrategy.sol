// Neptune Mutual Protocol (https://neptunemutual.com)
// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.0;

import "../../Recoverable.sol";
import "../../../interfaces/ILendingStrategy.sol";
import "../../../interfaces/external/ICompoundERC20DelegatorLike.sol";
import "../../../libraries/ProtoUtilV1.sol";
import "../../../libraries/StoreKeyUtil.sol";

contract CompoundStrategy is ILendingStrategy, Recoverable {
  using ProtoUtilV1 for IStore;
  using StoreKeyUtil for IStore;
  using ValidationLibV1 for IStore;
  using NTransferUtilV2 for IERC20;

  bytes32 private constant _KEY = keccak256(abi.encodePacked("lending", "strategy", "compound", "v2"));
  bytes32 public constant NS_DEPOSITS = "deposits";
  bytes32 public constant NS_WITHDRAWALS = "withdrawals";

  address public depositCertificate;
  ICompoundERC20DelegatorLike public delegator;
  mapping(uint256 => bool) public supportedChains;

  constructor(
    IStore _s,
    ICompoundERC20DelegatorLike _delegator,
    address _cDai
  ) Recoverable(_s) {
    depositCertificate = _cDai;
    delegator = _delegator;
  }

  function getDepositAsset() public view override returns (IERC20) {
    return IERC20(s.getStablecoin());
  }

  function getDepositCertificate() public view override returns (IERC20) {
    return IERC20(depositCertificate);
  }

  /**
   * @dev Gets info of this strategy by cover key
   * @param coverKey Enter the cover key
   * @param values[0] deposits Total amount deposited
   * @param values[1] withdrawals Total amount withdrawn
   */
  function getInfo(bytes32 coverKey) external view override returns (uint256[] memory values) {
    values = new uint256[](2);

    values[0] = s.getUintByKey(_getDepositsKey(coverKey));
    values[1] = s.getUintByKey(_getWithdrawalsKey(coverKey));
  }

  function _getCertificateBalance() private view returns (uint256) {
    return getDepositCertificate().balanceOf(address(this));
  }

  function _drain(IERC20 asset) private {
    uint256 amount = asset.balanceOf(address(this));

    if (amount > 0) {
      asset.ensureTransfer(s.getTreasury(), amount);

      emit Drained(asset, amount);
    }
  }

  /**
   * @dev Deposits the tokens to Compound
   * Ensure that you `approve` stablecoin before you call this function
   */
  function deposit(
    bytes32 coverKey,
    uint256 amount,
    address fromVault
  ) external override nonReentrant returns (uint256 cDaiMinted) {
    s.mustNotBePaused();
    s.callerMustBeProtocolMember();

    IERC20 stablecoin = getDepositAsset();
    IERC20 cDai = getDepositCertificate();

    require(stablecoin.balanceOf(fromVault) >= amount, "Balance insufficient");

    // This strategy should never have token balances
    _drain(cDai);
    _drain(stablecoin);

    // Transfer DAI to this contract; then approve and send it to delegator to mint cDAI
    stablecoin.ensureTransferFrom(fromVault, address(this), amount);
    stablecoin.approve(address(delegator), amount);
    uint256 result = delegator.mint(amount);

    require(result == 0, "Compound delegator mint failed");

    // Check how many cDAI we received
    cDaiMinted = _getCertificateBalance();

    // Immediately send cDai to the original vault stablecoin came from
    cDai.ensureTransferFrom(address(this), fromVault, amount);

    s.addUintByKey(_getDepositsKey(coverKey), amount);
    emit Deposited(coverKey, fromVault, amount);
  }

  /**
   * @dev Redeems cDai from Compound to receive stablecoin
   * Ensure that you `approve` cDai before you call this function
   */
  function withdraw(bytes32 coverKey, address sendTo) external virtual override nonReentrant returns (uint256 stablecoinWithdrawn) {
    s.mustNotBePaused();
    s.callerMustBeProtocolMember();

    IERC20 stablecoin = getDepositAsset();
    IERC20 cDai = getDepositCertificate();

    // This strategy should never have token balances
    _drain(cDai);
    _drain(stablecoin);

    uint256 cDaiBalance = cDai.balanceOf(sendTo);

    if (cDaiBalance == 0) {
      return 0;
    }

    // Transfer cDai to this contract; then approve and send it to delegator to redeem DAI
    cDai.ensureTransferFrom(sendTo, address(this), cDaiBalance);
    cDai.approve(address(delegator), cDaiBalance);
    uint256 result = delegator.redeem(cDaiBalance);

    require(result == 0, "Compound delegator redeem failed");

    // Check how many DAI we received
    stablecoinWithdrawn = stablecoin.balanceOf(address(this));

    // Immediately send DAI to the vault cDAI came from
    stablecoin.ensureTransfer(sendTo, stablecoinWithdrawn);

    s.addUintByKey(_getWithdrawalsKey(coverKey), stablecoinWithdrawn);
    emit Withdrawn(coverKey, sendTo, stablecoinWithdrawn);
  }

  function _getDepositsKey(bytes32 coverKey) private pure returns (bytes32) {
    return keccak256(abi.encodePacked(_KEY, coverKey, NS_DEPOSITS));
  }

  function _getWithdrawalsKey(bytes32 coverKey) private pure returns (bytes32) {
    return keccak256(abi.encodePacked(_KEY, coverKey, NS_WITHDRAWALS));
  }

  function getWeight() external pure override returns (uint256) {
    return 500;
  }

  function getKey() external pure override returns (bytes32) {
    return _KEY;
  }
}
