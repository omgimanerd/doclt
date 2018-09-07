/**
 * @fileoverview Module handling the image getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <image id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about an image'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  client.images.get(argv.imageid, (error, image) => {
    util.handleError(error)
    display.displayImage(image)
  })
}
