/**
 * @fileoverview Module handling the volume delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'delete <volume id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a volume'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.volumes.delete(argv.volumeid, error => {
    Util.handleError(error)
    display.displayMessage(`Volume ${argv.volumeid} deleted.`)
  })
}
