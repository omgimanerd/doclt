/**
 * @fileoverview Module handling the droplet power on command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'on <droplet id>'

exports.description = 'Power on a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.powerOn(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Powering on droplet...')
    display.displayActionID(action)
  })
}
