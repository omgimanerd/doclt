/**
 * @fileoverview Module handling the load balancer creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const prompt = require('prompt')

const display = require('../../lib/display')
const util = require('../../lib/util')

const ALGORITHMS = ['round_robin', 'least_connections']

exports.command = 'add'

exports.aliases = ['create']

exports.description = 'Create a new load balancer'.yellow

exports.builder = yargs => {
  yargs.option('name', {
    description: 'Set the load balancer name'.yellow
  }).option('algorithm', {
    description: 'Set the load balancing algorithm'.yellow,
    choices: ALGORITHMS
  }).option('region', {
    description: 'Set the region (slug identifier)'.yellow
  }).option('forwarding_rules', {
    description: 'Set the forwarding rules'.yellow,
    array: true
  }).option('redirect_http_to_https', {
    description: 'Redirect HTTP requests to HTTPS'.yellow,
    'boolean': true
  }).option('droplet_ids', {
    description:
      'Assign droplets to the load balancer (space separated)'.yellow,
    array: true
  })
}

exports.handler = argv => {
  const client = util.getClient()
  prompt.message = ''
  prompt.override = argv
  prompt.start()
  prompt.get({
    properties: {
      name: {
        description: 'Load balancer name'.yellow,
        required: true
      },
      algorithm: {
        description: 'Load balancing algorithm (optional)'.yellow,
        'default': 'round_robin',
        conform: value => ALGORITHMS.indexOf(value) !== -1,
        message: 'Algorithm must be round_robin or least_connections'
      },
      region: {
        description: 'Region ID'.yellow,
        required: true
      },
    }
  }, (error, result) => {
    console.log(result)
  })
}
