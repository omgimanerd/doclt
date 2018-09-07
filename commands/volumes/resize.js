/**
 * @fileoverview Module handling the volume resize command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'resize <volume id> <size>'

exports.description = 'Resize a volume'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs)
}

exports.handler = argv => {
  const client = util.getClient()
  client.volumes.get(argv.volumeid, (error, volume) => {
    util.handleError(error)
    const volumeid = argv.volumeid
    const size = argv.size
    const region = volume.region.slug
    client.volumes.resize(volumeid, size, region, (clientError, action) => {
      util.handleError(clientError)
      display.displayMessage('Volume resized.')
      display.displayAction(action)
    })
  })
}
