/**
 * @fileoverview Module handling the volume delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <volume id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a volume'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.volumes.delete(argv.volumeid, error => {
    util.handleError(error)
    display.displayMessage(`Volume ${argv.volumeid} deleted.`)
  })
}
