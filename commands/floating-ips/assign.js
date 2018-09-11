/**
 * @fileoverview Module handling the floating-ips assign command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'assign <floating ip> <droplet id>'

exports.description = 'Assign a floating IP to a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.floatingIps.assign(argv.ip, argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayActionID(action)
  })
}
