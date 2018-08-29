/**
 * @fileoverview Module handling the droplet restore command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'restore <droplet id> <backup id>'

exports.description = 'Restore a droplet from a backup'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.restore(argv.dropletid, argv.backupid, (error, action) => {
    Util.handleError(error)
    Display.displayMessage('Restoring droplet from backup...')
    Display.displayActionID(action)
  })
}
