/**
 * @fileoverview Module handling the floating-ips unassign command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'unassign <floating ip>'

exports.description = 'Unassign a floating IP'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.floatingIps.unassign(argv.floatingip, (error, action) => {
    Util.handleError(error)
    display.displayActionID(action)
  })
}
