/**
 * @fileoverview Module handling the floating IP action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'get <floating ip> <action id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a floating IP action'.yellow

exports.handler = argv => {
  const client = util.getClient()
  const ip = argv.floatingip
  const id = argv.actionid
  client.floatingIps.getAction(ip, id, (error, action) => {
    util.handleError(error)
    display.displayAction(action)
  })
}
