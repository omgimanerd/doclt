/**
 * @fileoverview Module handling the account detail command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../lib/display')
const util = require('../lib/util')

exports.command = 'account'

exports.aliases = ['acc']

exports.description = 'Display account information'.yellow

exports.builder = util.globalConfig

exports.handler = () => {
  const client = util.getClient()
  client.account.get((error, account) => {
    util.handleError(error)
    display.displayAccount(account)
  })
}
