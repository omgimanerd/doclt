/**
 * @fileoverview Module handling the snapshot listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'list <droplet id>'

exports.aliases = ['ls']

exports.description = 'List snapshots made of a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.snapshots(argv.dropletid, (error, snapshots) => {
    Util.handleError(error)
    display.displaySnapshots(snapshots)
  })
}
