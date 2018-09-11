/**
 * @fileoverview Module handling the load balancer getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <load balancer id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a load balancer'.yellow

exports.builder = yargs => {
  yargs.option('rules', {
    description: 'Show the forwarding rules'.yellow
  }).group(['rules'], 'Load Balancer Display Options:')
}

exports.handler = argv => {
  const client = util.getClient()
  client.loadBalancers.get(argv.loadbalancerid, (error, loadbalancer) => {
    util.handleError(error)
    display.displayLoadBalancer(loadbalancer)
  })
}
