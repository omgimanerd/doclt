/**
 * @fileoverview Module handling the load balancer droplet add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'add-droplets <load balancer id> [droplet ids..]'

exports.aliases = ['add-droplet']

exports.description = 'Add droplets to a load balancer'.yellow

exports.builder = yargs => {
  yargs.example('$0 load-balancers add-droplet 12345 52232 43451 32552')
}

exports.handler = argv => {
  const client = util.getClient()
  const lbId = argv.loadbalancerid
  const dropletIds = argv.dropletIds || []
  client.loadBalancers.add(lbId, dropletIds, error => {
    util.handleError(error)
    const s = dropletIds.length > 0 ? 's' : ''
    const dropletString = dropletIds.join(', ')
    display.displayMessage(
      `Droplet${s} ${dropletString} added to load balancer ${lbId}`
    )
  })
}
