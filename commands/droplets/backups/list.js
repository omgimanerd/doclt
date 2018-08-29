/**
 * @fileoverview Module handling the droplet backup listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'list <droplet id>'

exports.aliases = ['ls']

exports.description = 'List all backups of a droplet'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.backups(argv.dropletid, (error, backups) => {
    util.handleError(error)
    display.displaySnapshots(backups)
  })
}
