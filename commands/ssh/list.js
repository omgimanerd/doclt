/**
 * @fileoverview Module handling the SSH key listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all SSH keys'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = () => {
  const client = Util.getClient()
  client.account.listSshKeys((error, keys) => {
    Util.handleError(error)
    Display.displaySshKeys(keys)
  })
}
