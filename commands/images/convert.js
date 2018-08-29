/**
 * @fileoverview Module handling the image convert command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'convert <image id>'

exports.description = 'Convert an image into a snapshot'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.images.convert(argv.imageid, (error, action) => {
    util.handleError(error)
    display.displayActionID(action)
  })
}
