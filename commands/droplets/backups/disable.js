/**
 * @fileoverview Module handling the disabling of automatic backups for
 *   droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'disable <droplet id>'

exports.aliases = ['off']

exports.description = 'Disable automatic backups for a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.disableBackups(argv.dropletid, (error, action) => {
    Util.handleError(error)
    display.displayMessage('Automatic backups disabled.')
    display.displayActionID(action)
  })
}
