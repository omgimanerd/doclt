/**
 * @fileoverview Module handling the load balancer forwarding rule creation
 *   command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

const OPTIONS = [
  'entry_protocol', 'entry_port', 'target_protocol', 'target_port',
  'certificate_id', 'tls_passthrough'
]

exports.command = 'add-rule <load balancer id>'

exports.description = 'Add a forwarding rule'.yellow

exports.builder = yargs => {
  yargs.option('entry_protocol', {
    description: 'Set the protocol for traffic to the load balancer'.yellow,
    required: true
  }).option('entry_port', {
    description: 'Set the port the load balancer will listen on'.yellow,
    required: true
  }).option('target_protocol', {
    description: 'Set the protocol for traffic to the backend droplets'.yellow,
    required: true
  }).option('target_port', {
    description: 'Set the port to send backend traffic to'.yellow,
    required: true
  }).option('certificate_id', {
    description: 'Set an TLS certificate for SSL termination'.yellow,
    number: true
  }).option('tls_passthrough', {
    description: 'Enable TLS passthrough'.yellow,
    'boolean': true,
    'default': false
  }).group(OPTIONS, 'Forwarding Rule Attributes:')
    .example(`$0 load-balancers add-rule 1234 \\
      --entry_protocol http \\
      --entry_port 2000 \\
      --target_protocol http \\
      --target_port 8000`)
}

exports.handler = argv => {
  const client = util.getClient()
  const lbId = argv.loadbalancerid
  const args = util.filterOptions(argv, OPTIONS)
  client.loadBalancers.createForwardingRules(lbId, args, error => {
    util.handleError(error)
    display.displayMessage(`Forwarding rule added to load balancer ${lbId}.`)
  })
}
