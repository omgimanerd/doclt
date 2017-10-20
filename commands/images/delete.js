/**
 * @fileoverview Module handling the image delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'delete <image id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete an image'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const imageid = argv.imageid
  client.images.delete(imageid, error => {
    Util.handleError(error)
    Display.displayMessage('Image {0} deleted.', imageid)
  })
}
