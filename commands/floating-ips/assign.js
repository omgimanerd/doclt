/**
 * @fileoverview Module handling the floating-ips assign command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'assign <floating ip> <droplet id>'

exports.description = 'Assign a floating IP to a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.floatingIps.assign(argv.ip, argv.dropletid, (error, action) => {
    Util.handleError(error)
    Display.displayActionID(action)
  })
}
