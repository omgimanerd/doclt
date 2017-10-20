/**
 * @fileoverview Module handling the image convert command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'convert <image id>'

exports.description = 'Convert an image into a snapshot'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.images.convert(argv.imageid, (error, action) => {
    Util.handleError(error)
    Display.displayActionID(action)
  })
}
