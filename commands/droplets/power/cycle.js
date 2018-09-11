/**
 * @fileoverview Module handling the droplet power cycling command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'cycle <droplet id>'

exports.description = 'Power cycle a droplet (hard reset)'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.powerCycle(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Power cycling droplet...')
    display.displayActionID(action)
  })
}
