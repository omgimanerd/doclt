/**
 * @fileoverview Module handling the firewall rule removal command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

const OPTIONS = ['inbound_rules', 'outbound_rules']

exports.command = 'remove-rules <firewall id>'

exports.description = 'Remove access rules from a firewall'.yellow

exports.builder = yargs => {
  yargs.option('inbound_rules', {
    description: 'Delete inbound access rules'.yellow,
    array: true,
    coerce: util.arrayCsvToObject
  }).option('outbound_rules', {
    description: 'Delete outbound access rules'.yellow,
    array: true,
    coerce: util.arrayCsvToObject
  }).group(OPTIONS, 'Firewall Rule Attributes:')
    .example(`$0 firewalls remove-rule 1234 \\
      --inbound_rules protocol:http,ports:80,sources:2342352`)
}

exports.handler = argv => {
  const client = util.getClient()
  const firewallId = argv.firewallid
  const args = util.filterOptions(argv, OPTIONS)
  client.firewalls.removeRules(firewallId, args, error => {
    util.handleError(error)
    display.displayMessage('Firewall rule removed.')
  })
}
