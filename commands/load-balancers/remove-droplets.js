/**
 * @fileoverview Module handling the load balancer droplet remove command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'remove-droplets <load balancer id> <droplet ids>'

exports.description = 'Remove droplets from a load balancer'.yellow

exports.builder = yargs => {
  yargs.example(
    '$0 load-balancers remove-droplets 12345 52232,43451'
  )
}

exports.handler = argv => {
  const client = util.getClient()
  const lbId = argv.loadbalancerid
  const dropletIds = util.csvToArray(argv.dropletids)
  client.loadBalancers.remove(lbId, dropletIds, error => {
    util.handleError(error)
    const s = dropletIds.length > 0 ? 's' : ''
    const dropletString = dropletIds.join(', ')
    display.displayMessage(
      `Droplet${s} ${dropletString} removed from load balancer ${lbId}`
    )
  })
}
