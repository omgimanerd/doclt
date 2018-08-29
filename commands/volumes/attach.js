/**
 * @fileoverview Module handling the volume attach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'attach <volume id> <droplet id>'

exports.description = 'Attach a volume'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const volumeid = argv.volumeid
  const dropletid = argv.dropletid
  client.volumes.attach(volumeid, dropletid, (error, action) => {
    Util.handleError(error)
    Display.displayMessage('Volume attached.')
    Display.displayAction(action)
  })
}
