/**
 * @fileoverview Module handling the snapshot listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List snapshots on your account'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = () => {
  const client = Util.getClient()
  client.snapshots.list((error, snapshots) => {
    Util.handleError(error)
    display.displaySnapshots(snapshots)
  })
}
