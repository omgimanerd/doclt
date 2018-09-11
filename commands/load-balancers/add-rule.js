/**
 * @fileoverview Module handling the load balancer forwarding rule creation
 *   command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'add-rule <load balancer id> <entry> <target>'

exports.description = 'Add a forwarding rule'.yellow

exports.builder = yargs => {
  yargs.option('certificate', {
    description: 'Set an TLS certificate for SSL termination'.yellow,
    number: true
  }).option('tls', {
    description: 'Enable TLS passthrough'.yellow,
    'boolean': true,
    'default': false
  }).group(['certificate', 'tls'], 'Forwarding Rule Options:')
    .example('$0 add-rule 1234 tcp:4000 tcp:3000')
    .example(
      '$0 add-rule 1234 https:5000 https:9001 --certificate 1 --tls')
}

exports.handler = argv => {
  const client = util.getClient()
  const lbId = argv.loadbalancerid
  const entry = util.parseForwardingRule(argv.entry)
  const target = util.parseForwardingRule(argv.target)
  client.loadBalancers.createForwardingRules(lbId, {
    /* eslint-disable camelcase */
    entry_protocol: entry.protocol,
    entry_port: entry.port,
    target_protocol: target.protocol,
    target_port: target.port,
    certificate_id: argv.certificate,
    tls_passthrough: argv.tls
    /* eslint-enable camelcase */
  }, error => {
    util.handleError(error)
    display.displayMessage(
      `Forwarding rule added to load balancer ${lbId}.`)
  })
}
