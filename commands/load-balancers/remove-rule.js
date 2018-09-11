/**
 * @fileoverview Module handling the load balancer forwarding rule removal
 *   command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'remove-rule <load balancer id> <entry> <target>'

exports.description = 'Remove a forwarding rule'.yellow

exports.builder = yargs => {
  yargs.example('$0 remove-rule 1234 tcp:4000 tcp:3000')
}

exports.handler = argv => {
  const client = util.getClient()
  const lbId = argv.loadBalancerId
  const entry = util.parseForwardingRule(argv.entry)
  const target = util.parseForwardingRule(argv.target)
  client.loadBalancers.deleteForwardingRules(lbId, {
    /* eslint-disable camelcase */
    entry_protocol: entry.protocol,
    entry_port: entry.port,
    target_protocol: target.protocol,
    target_port: target.port
    /* eslint-enable camelcase */
  }, error => {
    util.handleError(error)
    display.displayMessage(
      `Forwarding rule deleted from load balancer ${lbId}.`)
  })
}
