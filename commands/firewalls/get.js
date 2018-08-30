/**
 * @fileoverview Module handling the firewall getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <firewall id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a firewall'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.firewalls.get(argv.firewallid, (error, firewall) => {
    util.handleError(error)
    display.displayFirewall(firewall)
  })
}
