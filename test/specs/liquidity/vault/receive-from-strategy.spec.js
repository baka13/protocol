/* eslint-disable no-unused-expressions */
const BigNumber = require('bignumber.js')
const { helper, key } = require('../../../../util')
const { deployDependencies } = require('./deps')

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

describe('Vault: receiveFromStrategy', () => {
  let deployed

  before(async () => {
    deployed = await deployDependencies()
  })

  it('reverts when amount is invalid', async () => {
    const coverKey = await deployed.vault.key()
    const amount = helper.ether(0)
    const strategyName = key.toBytes32('TestStrategy')
    const token = deployed.dai.address

    await deployed.vault.receiveFromStrategy(token, coverKey, strategyName, amount)
      .should.be.rejectedWith('Please specify amount')
  })

  it('reverts when coverKey is invalid', async () => {
    const coverKey = key.toBytes32('test-key')
    const amount = helper.ether(1)
    const strategyName = key.toBytes32('TestStrategy')
    const token = deployed.dai.address

    await deployed.vault.receiveFromStrategy(token, coverKey, strategyName, amount)
      .should.be.rejectedWith('Forbidden')
  })

  it('reverts when strategy name is invalid', async () => {
    const coverKey = await deployed.vault.key()
    const amount = helper.ether(1)
    const strategyName = key.toBytes32('TestStrategy')
    const token = deployed.dai.address

    await deployed.vault.receiveFromStrategy(token, coverKey, strategyName, amount)
      .should.be.rejectedWith('Not a strategy contract')
  })
})