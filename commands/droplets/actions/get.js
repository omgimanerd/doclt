/**
 * @fileoverview Module handling the droplet action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'get <droplet id> <action id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a droplet action'.yellow

exports.handler = argv => {
  const client = util.getClient()
  const dropletid = argv.dropletid
  const actionid = argv.actionid
  client.droplets.getAction(dropletid, actionid, (error, action) => {
    util.handleError(error)
    display.displayAction(action)
  })
}
