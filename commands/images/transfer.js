/**
 * @fileoverview Module handling the image transfer command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'transfer <image id> <region>'

exports.description = 'Transfer an image to another region'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.images.transfer(argv.imageid, argv.region, (error, action) => {
    Util.handleError(error)
    display.displayActionID(action)
  })
}
