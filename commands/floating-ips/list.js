/**
 * @fileoverview Module handling the floating-ip listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all floating IPs'.yellow

exports.builder = util.globalConfig

exports.handler = () => {
  const client = util.getClient()
  client.floatingIps.list((error, ips) => {
    util.handleError(error)
    display.displayFloatingIps(ips)
  })
}
