/**
 * @fileoverview Module handling the image delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <image id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete an image'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.images.delete(argv.imageid, error => {
    util.handleError(error)
    display.displayMessage(`Image ${argv.imageid} deleted.`)
  })
}
