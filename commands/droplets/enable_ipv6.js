/**
 * @fileoverview Module handling the IPv6 enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'enable_ipv6 <droplet id>'

exports.aliases = ['ipv6']

exports.description = 'Enable IPv6 on a droplet.'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.enableIpv6(argv.dropletid, (error, action) => {
    Util.handleError(error)
    display.displayMessage('IPv6 enabled.')
    display.displayActionID(action)
  })
}
