/**
 * @fileoverview Module handling the floating-ip delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'delete <floating ip>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a floating IP'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const floatingip = argv.floatingip
  client.floatingIps.delete(floatingip, error => {
    Util.handleError(error)
    Display.displayMessage('Floating IP {0} deleted.', floatingip)
  })
}
