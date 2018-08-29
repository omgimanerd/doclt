/**
 * @fileoverview Module handling the SSH key rename command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'rename <key id> <name>'

exports.aliases = ['update']

exports.description = 'Rename an SSH key'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.account.updateSshKey(argv.keyid, {
    name: argv.name
  }, (error, key) => {
    Util.handleError(error)
    display.displayMessage('SSH Key renamed.')
    display.displaySshKey(key, false)
  })
}
