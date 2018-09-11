/**
 * @fileoverview Module handling the droplet restore command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'restore <droplet id> <backup id>'

exports.description = 'Restore a droplet from a backup'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.restore(argv.dropletid, argv.backupid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Restoring droplet from backup...')
    display.displayActionID(action)
  })
}
