/**
 * @fileoverview Module handling the snapshot listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'list <droplet id>'

exports.aliases = ['ls']

exports.description = 'List snapshots of a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.snapshots(argv.dropletid, (error, snapshots) => {
    util.handleError(error)
    display.displaySnapshots(snapshots)
  })
}
