/**
 * @fileoverview Module handling the floating IP action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'list <floating ip>'

exports.aliases = ['ls']

exports.description = 'List all actions performed on a floating IP'.yellow

exports.builder = () => {
  const client = util.getClient()
  client.floatingIps.listActions((error, actions) => {
    util.handleError(error)
    display.displayActions(actions)
  })
}
