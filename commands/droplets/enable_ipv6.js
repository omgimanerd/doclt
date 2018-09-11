/**
 * @fileoverview Module handling the IPv6 enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'enable_ipv6 <droplet id>'

exports.aliases = ['ipv6']

exports.description = 'Enable IPv6 on a droplet.'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.enableIpv6(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('IPv6 enabled.')
    display.displayActionID(action)
  })
}
