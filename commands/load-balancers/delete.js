/**
 * @fileoverview Module handling the load balancer delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <load balancer id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a load balancer'.yellow

exports.handler = argv => {
  const client = util.getClient()
  const id = argv.loadbalancerid
  client.loadBalancers.delete(id, error => {
    util.handleError(error)
    display.displayMessage(`Load balancer ${id} deleted.`)
  })
}
