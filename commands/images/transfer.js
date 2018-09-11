/**
 * @fileoverview Module handling the image transfer command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'transfer <image id> <region>'

exports.description = 'Transfer an image to another region'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.images.transfer(argv.imageid, argv.region, (error, action) => {
    util.handleError(error)
    display.displayActionID(action)
  })
}
