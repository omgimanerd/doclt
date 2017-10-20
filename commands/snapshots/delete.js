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
  const snapshotid = argv.snapshotid
  client.snapshots.delete(snapshotid, error => {
    Util.handleError(error)
    Display.displayMessage('Snapshot {0} deleted.', snapshotid)
  })
}
