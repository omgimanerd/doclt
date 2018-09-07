/**
 * @fileoverview Module handling the SSH key delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <key id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete an SSH key'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  client.account.deleteSshKey(argv.keyid, error => {
    util.handleError(error)
    display.displayMessage(`SSH Key ${argv.keyid} deleted.`)
  })
}
