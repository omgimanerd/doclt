/**
 * @fileoverview Module handling the load balancer listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all load balancers'.yellow

exports.handler = () => {
  const client = util.getClient()
  client.loadBalancers.list((error, loadBalancers) => {
    util.handleError(error)
    display.displayLoadBalancers(loadBalancers)
  })
}
