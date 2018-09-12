/**
 * @fileoverview Module handling the load balancer update command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

const OPTIONS = [
  'name', 'algorithm', 'region', 'forwarding_rules', 'health_check',
  'sticky_sessions', 'redirect_http_to_https', 'droplet_ids', 'tag'
]

exports.command = 'update <load balancer id>'

exports.description = 'Update a load balancer'.yellow

exports.builder = yargs => {
  yargs.option('name', {
    description: 'Set the load balancer name'.yellow,
    required: true
  }).option('algorithm', {
    description: 'Set the load balancing algorithm'.yellow,
    choices: ['round_robin', 'least_connections']
  }).option('region', {
    description: 'Set the region'.yellow,
    required: true
  }).option('forwarding_rules', {
    description: 'Set the forwarding rules (config object)'.yellow,
    required: true,
    array: true
  }).option('health_check', {
    description: 'Set health check configuration (config object)'.yellow
  }).option('sticky_sessions', {
    description: 'Set stick session configuration (config object)'.yellow
  }).option('redirect_http_to_https', {
    description: 'Redirect HTTP requests to HTTPS'.yellow,
    'boolean': true
  }).option('droplet_ids', {
    description: 'Assign droplets to the load balancer'.yellow,
    array: true
  }).option('tag', {
    description: 'Assign a droplet tag to the load balancer'.yellow
  }).group(OPTIONS, 'Load Balancer Options:')
    .example(`$0 load-balancers update 12345 \\
    --name lb1 \\
    --region nyc1 \\
    --forwarding_rules \\
    entry_protocol:tcp,entry_port:200,target_protocol:tcp,target_port:200 \\
    --droplet_ids 1234 5677`)
}

exports.handler = argv => {
  const client = util.getClient()
  const lbId = util.loadbalancerid
  const args = util.filterOptions(argv, OPTIONS)
  client.loadBalancers.update(lbId, args, (error, loadBalancer) => {
    util.handleError(error)
    display.displayLoadBalancer(loadBalancer)
  })
}
