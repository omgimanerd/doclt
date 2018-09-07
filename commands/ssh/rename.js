/**
 * @fileoverview Module handling the SSH key rename command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'rename <key id> <name>'

exports.aliases = ['update']

exports.description = 'Rename an SSH key'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  client.account.updateSshKey(argv.keyid, {
    name: argv.name
  }, (error, key) => {
    util.handleError(error)
    display.displayMessage('SSH Key renamed.')
    display.displaySshKey(key, false)
  })
}
