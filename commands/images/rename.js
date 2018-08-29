/**
 * @fileoverview Module handling the image renaming command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'rename <image id> <name>'

exports.aliases = ['update']

exports.description = 'Rename an image'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.images.update(argv.imageid, {
    name: argv.name
  }, (error, image) => {
    Util.handleError(error)
    display.displayImage(image)
  })
}
