/**
 * @fileoverview Module handling the enabling of automatic backups for
 *   droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'enable <droplet id>'

exports.aliases = ['on']

exports.description = 'Enable automatic backups for a droplet'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.enableBackups(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Automatic backups enabled.')
    display.displayActionID(action)
  })
}
