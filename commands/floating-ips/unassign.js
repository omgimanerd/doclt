/**
 * @fileoverview Module handling the floating-ips unassign command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'unassign <floating ip>'

exports.description = 'Unassign a floating IP'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.floatingIps.unassign(argv.floatingip, (error, action) => {
    util.handleError(error)
    display.displayActionID(action)
  })
}
