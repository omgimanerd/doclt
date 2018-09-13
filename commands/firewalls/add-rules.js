/**
 * @fileoverview Module handling the firewall rule add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

const OPTIONS = ['inbound_rules', 'outbound_rules']

exports.command = 'add-rules <firewall id>'

exports.description = 'Add access rules to a firewall'.yellow

exports.builder = yargs => {
  yargs.option('inbound_rules', {
    description: 'Add inbound access rules'.yellow,
    array: true,
    coerce: util.arrayCsvToObject
  }).option('outbound_rules', {
    description: 'Add outbound access rules'.yellow,
    array: true,
    coerce: util.arrayCsvToObject
  }).group(OPTIONS, 'Firewall Rule Attributes:')
    .example(`$0 firewalls add-rule 1234 \\
      --inbound_rules protocol:tcp,ports:4000,sources:2342353`)
}

exports.handler = argv => {
  const client = util.getClient()
  const firewallId = argv.firewallid
  const args = util.filterOptions(argv, OPTIONS)
  client.firewalls.addRules(firewallId, args, error => {
    util.handleError(error)
    display.displayMessage('Firewall rule added.')
  })
}
