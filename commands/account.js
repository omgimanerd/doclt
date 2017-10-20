/**
 * @fileoverview Module handling the account detail command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../lib/Display')
const Util = require('../lib/Util')

exports.command = 'account'

exports.aliases = ['acc']

exports.description = 'Display account information'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 1, exports.command)
}

exports.handler = () => {
  const client = Util.getClient()
  client.account.get((error, account) => {
    Util.handleError(error)
    Display.displayAccount(account)
  })
}
