/**
 * @fileoverview Module handling the floating-ip delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'delete <floating ip>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a floating IP'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.floatingIps.delete(argv.floatingip, error => {
    Util.handleError(error)
    display.displayMessage(`Floating IP ${argv.floatingip} deleted.`)
  })
}
