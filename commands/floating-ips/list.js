/**
 * @fileoverview Module handling the floating-ip listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all floating IPs'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = () => {
  const client = Util.getClient()
  client.floatingIps.list((error, ips) => {
    Util.handleError(error)
    Display.displayFloatingIps(ips)
  })
}
