/**
 * @fileoverview Module handling the floating-ip delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <floating ip>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a floating IP'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  client.floatingIps.delete(argv.floatingip, error => {
    util.handleError(error)
    display.displayMessage(`Floating IP ${argv.floatingip} deleted.`)
  })
}
