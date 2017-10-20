/**
 * @fileoverview Module handling the floating-ips get command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'get <floating ip>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a floating IP'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.floatingIps.get(argv.floatingip, (error, ip) => {
    Util.handleError(error)
    Display.displayFloatingIp(ip)
  })
}
