/**
 * @fileoverview Module handling the firewall update command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

const OPTIONS = [
  'name', 'inbound_rules', 'outbound_rules', 'droplet_ids', 'tags'
]

exports.command = 'update <firewall id>'

exports.description = 'Update a firewall\'s configuration'.yellow

exports.builder = yargs => {
  yargs.option('name', {
    description: 'Set the firewall name'.yellow,
    required: true
  }).option('inbound_rules', {
    description: 'Set the inbound access rules'.yellow,
    required: true,
    array: true,
    coerce: util.arrayCsvToObject
  }).option('outbound_rules', {
    description: 'Set the outbound access rules'.yellow,
    required: true,
    array: true,
    coerce: util.arrayCsvToObject
  }).option('droplet_ids', {
    description: 'Assign droplet IDs to this firewall'.yellow,
    array: true
  }).option('tags', {
    description: 'Assign tagged droplets to this firewall'.yellow,
    array: true
  }).group(OPTIONS, 'Firewall Attributes:')
    .example(`$0 firewalls update 1234 \\
      --name firewall1 \\
      --inbound_rules protocol:tcp,ports:4500,sources:2355643 \\
      --outbound_rules protocol:tcp,ports:8000,destinations:2356437`)
}

exports.handler = argv => {
  const client = util.getClient()
  const firewallId = argv.firewallid
  const args = util.filterOptions(argv, OPTIONS)
  client.firewalls.update(firewallId, args, (error, firewall) => {
    util.handleError(error)
    display.displayMessage('Firewall updated.')
    display.displayFirewall(firewall)
  })
}
