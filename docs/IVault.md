# IVault.sol

View Source: [contracts/interfaces/IVault.sol](../contracts/interfaces/IVault.sol)

**↗ Extends: [IMember](IMember.md), [IERC20](IERC20.md)**
**↘ Derived Contracts: [VaultBase](VaultBase.md)**

**IVault**

**Events**

```js
event GovernanceTransfer(address indexed to, uint256  amount);
event PodsIssued(address indexed account, uint256  issued, uint256  liquidityAdded);
event PodsRedeemed(address indexed account, uint256  redeemed, uint256  liquidityReleased);
```

## Functions

- [addLiquidityInternal(bytes32 coverKey, address account, uint256 amount)](#addliquidityinternal)
- [addLiquidity(bytes32 coverKey, uint256 amount)](#addliquidity)
- [removeLiquidity(bytes32 coverKey, uint256 amount)](#removeliquidity)
- [transferGovernance(bytes32 coverKey, address to, uint256 amount)](#transfergovernance)

### addLiquidityInternal

Adds liquidity to the specified cover contract

```js
function addLiquidityInternal(bytes32 coverKey, address account, uint256 amount) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| coverKey | bytes32 | Enter the cover key | 
| account | address | Specify the account on behalf of which the liquidity is being added. | 
| amount | uint256 | Enter the amount of liquidity token to supply. | 

### addLiquidity

Adds liquidity to the specified cover contract

```js
function addLiquidity(bytes32 coverKey, uint256 amount) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| coverKey | bytes32 | Enter the cover key | 
| amount | uint256 | Enter the amount of liquidity token to supply. | 

### removeLiquidity

Removes liquidity from the specified cover contract

```js
function removeLiquidity(bytes32 coverKey, uint256 amount) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| coverKey | bytes32 | Enter the cover key | 
| amount | uint256 | Enter the amount of liquidity token to remove. | 

### transferGovernance

Transfers liquidity to governance contract.

```js
function transferGovernance(bytes32 coverKey, address to, uint256 amount) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| coverKey | bytes32 | Enter the cover key | 
| to | address | Enter the destination account | 
| amount | uint256 | Enter the amount of liquidity token to transfer. | 

## Contracts

* [AccessControl](AccessControl.md)
* [AccessControlLibV1](AccessControlLibV1.md)
* [Address](Address.md)
* [BaseLibV1](BaseLibV1.md)
* [BokkyPooBahsDateTimeLibrary](BokkyPooBahsDateTimeLibrary.md)
* [Commission](Commission.md)
* [Context](Context.md)
* [Controller](Controller.md)
* [Cover](Cover.md)
* [CoverAssurance](CoverAssurance.md)
* [CoverBase](CoverBase.md)
* [CoverProvision](CoverProvision.md)
* [CoverStake](CoverStake.md)
* [CoverUtilV1](CoverUtilV1.md)
* [cToken](cToken.md)
* [cTokenFactory](cTokenFactory.md)
* [cTokenFactoryLibV1](cTokenFactoryLibV1.md)
* [Destroyable](Destroyable.md)
* [ERC165](ERC165.md)
* [ERC20](ERC20.md)
* [FakeRecoverable](FakeRecoverable.md)
* [FakeStore](FakeStore.md)
* [FakeToken](FakeToken.md)
* [FakeUniswapV2RouterLike](FakeUniswapV2RouterLike.md)
* [Governance](Governance.md)
* [GovernanceUtilV1](GovernanceUtilV1.md)
* [IAccessControl](IAccessControl.md)
* [IClaimsProcessor](IClaimsProcessor.md)
* [ICommission](ICommission.md)
* [ICover](ICover.md)
* [ICoverAssurance](ICoverAssurance.md)
* [ICoverProvision](ICoverProvision.md)
* [ICoverStake](ICoverStake.md)
* [ICToken](ICToken.md)
* [ICTokenFactory](ICTokenFactory.md)
* [IERC165](IERC165.md)
* [IERC20](IERC20.md)
* [IERC20Metadata](IERC20Metadata.md)
* [IGovernance](IGovernance.md)
* [IMember](IMember.md)
* [IPausable](IPausable.md)
* [IPolicy](IPolicy.md)
* [IPolicyAdmin](IPolicyAdmin.md)
* [IPriceDiscovery](IPriceDiscovery.md)
* [IProtocol](IProtocol.md)
* [IReporter](IReporter.md)
* [IStore](IStore.md)
* [IUniswapV2PairLike](IUniswapV2PairLike.md)
* [IUniswapV2RouterLike](IUniswapV2RouterLike.md)
* [IVault](IVault.md)
* [IVaultFactory](IVaultFactory.md)
* [IWitness](IWitness.md)
* [MaliciousToken](MaliciousToken.md)
* [Migrations](Migrations.md)
* [NTransferUtilV2](NTransferUtilV2.md)
* [NTransferUtilV2Intermediate](NTransferUtilV2Intermediate.md)
* [Ownable](Ownable.md)
* [Pausable](Pausable.md)
* [Policy](Policy.md)
* [PolicyAdmin](PolicyAdmin.md)
* [PolicyManager](PolicyManager.md)
* [PriceDiscovery](PriceDiscovery.md)
* [Processor](Processor.md)
* [ProtoBase](ProtoBase.md)
* [Protocol](Protocol.md)
* [ProtoUtilV1](ProtoUtilV1.md)
* [Recoverable](Recoverable.md)
* [ReentrancyGuard](ReentrancyGuard.md)
* [RegistryLibV1](RegistryLibV1.md)
* [Reporter](Reporter.md)
* [Resolution](Resolution.md)
* [SafeERC20](SafeERC20.md)
* [SafeMath](SafeMath.md)
* [Store](Store.md)
* [StoreBase](StoreBase.md)
* [StoreKeyUtil](StoreKeyUtil.md)
* [Strings](Strings.md)
* [ValidationLibV1](ValidationLibV1.md)
* [Vault](Vault.md)
* [VaultBase](VaultBase.md)
* [VaultFactory](VaultFactory.md)
* [VaultFactoryLibV1](VaultFactoryLibV1.md)
* [VaultLibV1](VaultLibV1.md)
* [Witness](Witness.md)