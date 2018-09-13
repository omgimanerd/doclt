/**
 * @fileoverview Module handling the firewall deletion command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.commands = 'delete <firewall id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a firewall'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.firewalls.delete(argv.firewallid, error => {
    util.handleError(error)
    display.displayMessage(`Firewall ${argv.firewallid} deleted.`)
  })
}
