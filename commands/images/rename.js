/**
 * @fileoverview Module handling the image renaming command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'rename <image id> <name>'

exports.aliases = ['update']

exports.description = 'Rename an image'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.images.update(argv.imageid, {
    name: argv.name
  }, (error, image) => {
    util.handleError(error)
    display.displayImage(image)
  })
}
