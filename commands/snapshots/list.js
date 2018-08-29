/**
 * @fileoverview Module handling the snapshot listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List snapshots on your account'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = () => {
  const client = util.getClient()
  client.snapshots.list((error, snapshots) => {
    util.handleError(error)
    display.displaySnapshots(snapshots)
  })
}
