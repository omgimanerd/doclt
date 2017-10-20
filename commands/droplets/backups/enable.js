/**
 * @fileoverview Module handling the enabling of automatic backups for
 *   droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../../lib/Display')
const Util = require('../../../lib/Util')

exports.command = 'enable <droplet id>'

exports.aliases = ['on']

exports.description = 'Enable automatic backups for a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.enableBackups(argv.dropletid, (error, action) => {
    Util.handleError(error)
    Display.displayActionID(action, 'Automatic backups enabled.')
  })
}
