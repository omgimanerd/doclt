/**
 * @fileoverview Module handing the firewall listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all firewalls'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = () => {
  const client = util.getClient()
  client.firewalls.list((error, firewalls) => {
    util.handleError(error)
    display.displayFirewalls(firewalls)
  })
}
