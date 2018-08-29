/**
 * @fileoverview Module handling the volume attach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'attach <volume id> <droplet id>'

exports.description = 'Attach a volume'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  const volumeid = argv.volumeid
  const dropletid = argv.dropletid
  client.volumes.attach(volumeid, dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Volume attached.')
    display.displayAction(action)
  })
}
