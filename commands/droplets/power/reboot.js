/**
 * @fileoverview Module handling the droplet reboot command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'reboot <droplet id>'

exports.aliases = ['restart']

exports.description = 'Gracefully reboot a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.reboot(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Rebooting droplet...')
    display.displayActionID(action)
  })
}
