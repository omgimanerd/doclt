/**
 * @fileoverview Module handling the volume resize command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'resize <volume id> <size>'

exports.description = 'Resize a volume'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.volumes.get(argv.volumeid, (error, volume) => {
    Util.handleError(error)
    const volumeid = argv.volumeid
    const size = argv.size
    const region = volume.region.slug
    client.volumes.resize(volumeid, size, region, (clientError, action) => {
      Util.handleError(clientError)
      Display.displayAction(action, 'Volume resized.')
    })
  })
}
