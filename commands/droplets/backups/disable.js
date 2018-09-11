/**
 * @fileoverview Module handling the disabling of automatic backups for
 *   droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'disable <droplet id>'

exports.aliases = ['off']

exports.description = 'Disable automatic backups for a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.disableBackups(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Automatic backups disabled.')
    display.displayActionID(action)
  })
}
