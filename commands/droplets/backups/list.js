/**
 * @fileoverview Module handling the droplet backup listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../../lib/Display')
const Util = require('../../../lib/Util')

exports.command = 'list <droplet id>'

exports.aliases = ['ls']

exports.description = 'List all backups of a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.backups(argv.dropletid, (error, backups) => {
    Util.handleError(error)
    Display.displaySnapshots(backups)
  })
}
