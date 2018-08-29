/**
 * @fileoverview Module handling the snapshot delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'delete <snapshot id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a snapshot'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.snapshots.delete(argv.snapshotid, error => {
    Util.handleError(error)
    Display.displayMessage(`Snapshot ${argv.snapshotid} deleted.`)
  })
}
