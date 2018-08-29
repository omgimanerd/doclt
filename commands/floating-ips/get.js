/**
 * @fileoverview Module handling the floating-ips get command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <floating ip>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a floating IP'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.floatingIps.get(argv.floatingip, (error, ip) => {
    util.handleError(error)
    display.displayFloatingIp(ip)
  })
}
