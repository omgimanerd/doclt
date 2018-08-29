/**
 * @fileoverview Module handling the SSH key getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'get <key id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about an SSH key'.yellow

exports.builder = yargs => {
  yargs.option('key', {
    description: 'Show only the public key'.yellow
  }).group(['key'], 'SSH Key Options:')
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.account.getSshKey(argv.keyid, (error, key) => {
    Util.handleError(error)
    display.displaySshKey(key, argv.key)
  })
}
