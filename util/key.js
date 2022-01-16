const ethers = require('ethers')

const encodeKey = (x) => ethers.utils.solidityKeccak256(['bytes32'], [toBytes32(x)])
const encodeKeys = (x, y) => ethers.utils.solidityKeccak256(x, y)
const toBytes32 = (x) => ethers.utils.formatBytes32String(x)
const getCoverContractKey = (namespace, coverKey) => encodeKeys(['bytes32', 'bytes32'], [toBytes32(namespace), coverKey])
const qualifyBytes32 = (k) => encodeKeys(['bytes32', 'bytes32'], [PROTOCOL.NS.CONTRACTS, k])
const qualify = (k) => encodeKeys(['bytes32', 'address'], [PROTOCOL.NS.CONTRACTS, k])
const qualifyMember = (k) => encodeKeys(['bytes32', 'address'], [PROTOCOL.NS.MEMBERS, k])

const ACCESS_CONTROL = {
  ADMIN: toBytes32('0x00'),
  COVER_MANAGER: toBytes32('role:cover:manager'),
  LIQUIDITY_MANAGER: toBytes32('role:liquidity:manager'),
  GOVERNANCE_AGENT: toBytes32('role:governance:agent'),
  GOVERNANCE_ADMIN: toBytes32('role:governance:admin'),
  UPGRADE_AGENT: toBytes32('role:upgrade:agent'),
  RECOVERY_AGENT: toBytes32('role:recovery:agent'),
  PAUSE_AGENT: toBytes32('role:pause:agent'),
  UNPAUSE_AGENT: toBytes32('role:unpause:agent')
}

const BOND = {
  TO_CLAIM: toBytes32('ns:pool:bond:to:claim'),
  CONTRIBUTION: toBytes32('ns:pool:bond:contribution'),
  LP_TOKEN: toBytes32('ns:pool:bond:lq:pair:token'),
  DISCOUNT_RATE: toBytes32('ns:pool:bond:discount'),
  MAX_UNIT: toBytes32('ns:pool:bond:max:unit'),
  VESTING_TERM: toBytes32('ns:pool:bond:vesting:term'),
  UNLOCK_DATE: toBytes32('ns:pool:bond:unlock:date'),
  TOTAL_NPM_ALLOCATED: toBytes32('ns:pool:bond:total:npm:alloc'),
  TOTAL_NPM_DISTRIBUTED: toBytes32('ns:pool:bond:total:npm:distrib')
}

const PROTOCOL = {
  CNS: {
    CORE: toBytes32('cns:core'),
    NPM: toBytes32('cns:core:npm:instance'),
    COVER: toBytes32('cns:cover'),
    UNISWAP_V2_ROUTER: toBytes32('cns:core:uni:v2:router'),
    UNISWAP_V2_FACTORY: toBytes32('cns:core:uni:v2:factory'),
    REASSURANCE_VAULT: toBytes32('cns:core:reassurance:vault'),
    PRICE_DISCOVERY: toBytes32('cns:core:price:discovery'),
    TREASURY: toBytes32('cns:core:treasury'),
    COVER_REASSURANCE: toBytes32('cns:cover:reassurance'),
    POOL_BOND: toBytes32('cns:pool:bond'),
    COVER_POLICY: toBytes32('cns:cover:policy'),
    COVER_POLICY_MANAGER: toBytes32('cns:cover:policy:manager'),
    COVER_POLICY_ADMIN: toBytes32('cns:cover:policy:admin'),
    COVER_STAKE: toBytes32('cns:cover:stake'),
    COVER_VAULT: toBytes32('cns:cover:vault'),
    COVER_STABLECOIN: toBytes32('cns:cover:sc'),
    COVER_CXTOKEN_FACTORY: toBytes32('cns:cover:cxtoken:factory'),
    COVER_VAULT_FACTORY: toBytes32('cns:cover:vault:factory'),
    BOND_POOL: toBytes32('cns:pools:bond'),
    STAKING_POOL: toBytes32('cns:pools:staking'),
    GOVERNANCE: toBytes32('cns:gov'),
    GOVERNANCE_RESOLUTION: toBytes32('cns:gov:resolution'),
    CLAIM_PROCESSOR: toBytes32('cns:claim:processor'),
    BURNER: toBytes32('cns:core:burner')
  },
  NS: {
    MEMBERS: toBytes32('ns:members'),
    CONTRACTS: toBytes32('ns:contracts'),
    COVER: toBytes32('ns:cover'),
    COVER_CREATION_FEE: toBytes32('ns:cover:creation:fee'),
    COVER_CREATION_MIN_STAKE: toBytes32('ns:cover:creation:min:stake'),
    COVER_REASSURANCE: toBytes32('ns:cover:reassurance'),
    COVER_REASSURANCE_TOKEN: toBytes32('ns:cover:reassurance:token'),
    COVER_REASSURANCE_WEIGHT: toBytes32('ns:cover:reassurance:weight'),
    COVER_CLAIMABLE: toBytes32('ns:cover:claimable'),
    COVER_FEE_EARNING: toBytes32('ns:cover:fee:earning'),
    COVER_INFO: toBytes32('ns:cover:info'),
    COVER_OWNER: toBytes32('ns:cover:owner'),
    COVER_LIQUIDITY: toBytes32('ns:cover:liquidity'),
    COVER_LIQUIDITY_ADDED: toBytes32('ns:cover:liquidity:add'),
    COVER_LIQUIDITY_REMOVED: toBytes32('ns:cover:liquidity:rem'),
    COVER_LIQUIDITY_MIN_PERIOD: toBytes32('ns:cover:liquidity:min:period'),
    COVER_LIQUIDITY_COMMITTED: toBytes32('ns:cover:liquidity:committed'),
    COVER_LIQUIDITY_NAME: toBytes32('ns:cover:liquidityName'),
    COVER_LIQUIDITY_RELEASE_DATE: toBytes32('ns:cover:liquidity:release'),
    COVER_STABLECOIN_LENT_TOTAL: toBytes32('ns:cover:sc:total:lent'),
    COVER_HAS_FLASH_LOAN: toBytes32('ns:cover:has:fl'),
    COVER_LIQUIDITY_FLASH_LOAN_FEE: toBytes32('ns:cover:liquidity:fl:fee'),
    COVER_LIQUIDITY_FLASH_LOAN_FEE_PROTOCOL: toBytes32('ns:proto:cover:liquidity:fl:fee'),
    COVER_POLICY_RATE_FLOOR: toBytes32('ns:cover:policy:rate:floor'),
    COVER_POLICY_RATE_CEILING: toBytes32('ns:cover:policy:rate:ceiling'),
    COVER_PROVISION: toBytes32('ns:cover:provision'),
    COVER_STAKE: toBytes32('ns:cover:stake'),
    COVER_STAKE_OWNED: toBytes32('ns:cover:stake:owned'),
    COVER_STATUS: toBytes32('ns:cover:status'),
    COVER_CXTOKEN: toBytes32('ns:cover:cxtoken'),
    COVER_WHITELIST: toBytes32('ns:cover:whitelist'),
    GOVERNANCE_RESOLUTION_TS: toBytes32('ns:gov:resolution:ts'),
    GOVERNANCE_UNSTAKEN: toBytes32('ns:gov:unstaken'),
    GOVERNANCE_UNSTAKE_TS: toBytes32('ns:gov:unstake:ts'),
    GOVERNANCE_UNSTAKE_REWARD: toBytes32('ns:gov:unstake:reward'),
    GOVERNANCE_UNSTAKE_BURNED: toBytes32('ns:gov:unstake:burned'),
    GOVERNANCE_UNSTAKE_REPORTER_FEE: toBytes32('ns:gov:unstake:rep:fee'),
    GOVERNANCE_REPORTING_MIN_FIRST_STAKE: toBytes32('ns:gov:rep:min:first:stake'),
    GOVERNANCE_REPORTING_INCIDENT_DATE: toBytes32('ns:gov:rep:incident:date'),
    GOVERNANCE_REPORTING_PERIOD: toBytes32('ns:gov:rep:period'),
    GOVERNANCE_REPORTING_WITNESS_YES: toBytes32('ns:gov:rep:witness:yes'),
    GOVERNANCE_REPORTING_WITNESS_NO: toBytes32('ns:gov:rep:witness:no'),
    GOVERNANCE_REPORTING_STAKE_OWNED_YES: toBytes32('ns:gov:rep:stake:owned:yes'),
    GOVERNANCE_REPORTING_STAKE_OWNED_NO: toBytes32('ns:gov:rep:stake:owned:no'),
    GOVERNANCE_REPORTING_BURN_RATE: toBytes32('ns:gov:rep:burn:rate'),
    GOVERNANCE_REPORTER_COMMISSION: toBytes32('ns:gov:reporter:commission'),
    CLAIM_PERIOD: toBytes32('ns:claim:period'),
    CLAIM_BEGIN_TS: toBytes32('ns:claim:begin:ts'),
    CLAIM_EXPIRY_TS: toBytes32('ns:claim:expiry:ts'),
    CLAIM_PLATFORM_FEE: toBytes32('ns:claim:platform:fee'),
    CLAIM_REPORTER_COMMISSION: toBytes32('ns:claim:reporter:commission')
  },
  CNAME: {
    PROTOCOL: toBytes32('Neptune Mutual Protocol'),
    TREASURY: toBytes32('Treasury'),
    POLICY: toBytes32('Policy'),
    POLICY_ADMIN: toBytes32('PolicyAdmin'),
    POLICY_MANAGER: toBytes32('PolicyManager'),
    BOND_POOL: toBytes32('BondPool'),
    STAKING_POOL: toBytes32('StakingPool'),
    POD_STAKING_POOL: toBytes32('PODStakingPool'),
    CLAIMS_PROCESSOR: toBytes32('ClaimsProcessor'),
    PRICE_DISCOVERY: toBytes32('PriceDiscovery'),
    COVER: toBytes32('Cover'),
    GOVERNANCE: toBytes32('Governance'),
    RESOLUTION: toBytes32('Resolution'),
    VAULT_FACTORY: toBytes32('VaultFactory'),
    CXTOKEN_FACTORY: toBytes32('cxTokenFactory'),
    COVER_PROVISION: toBytes32('CoverProvision'),
    COVER_STAKE: toBytes32('CoverStake'),
    COVER_REASSURANCE: toBytes32('CoverReassurance'),
    LIQUIDITY_VAULT: toBytes32('Vault')
  }
}

const STAKING = {
  NAME: toBytes32('ns:pool:staking:name'),
  LOCKED: toBytes32('ns:pool:staking:locked'),
  LOCKUP_PERIOD: toBytes32('ns:pool:staking:lockup:period'),
  STAKING_TARGET: toBytes32('ns:pool:staking:target'),
  CUMULATIVE_STAKING_AMOUNT: toBytes32('ns:pool:staking:cum:amount'),
  STAKING_TOKEN: toBytes32('ns:pool:staking:token'),
  STAKING_TOKEN_UNI_STABLECOIN_PAIR: toBytes32('ns:pool:staking:token:uni:pair'),
  REWARD_TOKEN: toBytes32('ns:pool:reward:token'),
  REWARD_TOKEN_UNI_STABLECOIN_PAIR: toBytes32('ns:pool:reward:token:uni:pair'),
  STAKING_TOKEN_BALANCE: toBytes32('ns:pool:staking:token:balance'),
  REWARD_TOKEN_DEPOSITS: toBytes32('ns:pool:reward:token:deposits'),
  REWARD_TOKEN_DISTRIBUTION: toBytes32('ns:pool:reward:token:distrib'),
  MAX_STAKE: toBytes32('ns:pool:reward:token'),
  REWARD_PER_BLOCK: toBytes32('ns:pool:reward:per:block'),
  REWARD_PLATFORM_FEE: toBytes32('ns:pool:reward:platform:fee'),
  REWARD_TOKEN_BALANCE: toBytes32('ns:pool:reward:token:balance'),
  DEPOSIT_HEIGHTS: toBytes32('ns:pool:deposit:heights'),
  REWARD_HEIGHTS: toBytes32('ns:pool:reward:heights'),
  TOTAL_REWARD_GIVEN: toBytes32('ns:pool:reward:total:given')
}

module.exports = {
  encodeKey,
  encodeKeys,
  toBytes32,
  getCoverContractKey,
  qualify,
  qualifyMember,
  qualifyBytes32,
  ACCESS_CONTROL,
  BOND,
  PROTOCOL,
  STAKING
}
