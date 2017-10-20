/**
 * @fileoverview Module handling the image getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'get <image id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about an image'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.images.get(argv.imageid, (error, image) => {
    Util.handleError(error)
    Display.displayImage(image)
  })
}
