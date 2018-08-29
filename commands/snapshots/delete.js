/**
 * @fileoverview Module handling the snapshot delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <snapshot id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a snapshot'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.snapshots.delete(argv.snapshotid, error => {
    util.handleError(error)
    display.displayMessage(`Snapshot ${argv.snapshotid} deleted.`)
  })
}
