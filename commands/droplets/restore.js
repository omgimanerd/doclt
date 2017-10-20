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
  const dropletid = argv.dropletid
  const backupid = argv.backupid
  client.droplets.restore(dropletid, backupid, (error, action) => {
    Util.handleError(error)
    Display.displayActionID(action, 'Restoring droplet from backup...')
  })
}
