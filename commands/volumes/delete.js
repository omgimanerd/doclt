/**
 * @fileoverview Module handling the volume delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'delete <volume id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a volume'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const volumeid = argv.volumeid
  client.volumes.delete(volumeid, error => {
    Util.handleError(error)
    Display.displayMessage('Volume {0} deleted.', volumeid)
  })
}
