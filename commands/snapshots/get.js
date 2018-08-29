/**
 * @fileoverview Module handling the snapshot getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <snapshot id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a snapshot'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  /**
   * We're going to use the images endpoint to get the
   * snapshot so that we can get information like
   * distribution and type.
   */
  client.images.get(argv.snapshotid, (error, image) => {
    util.handleError(error)
    display.displayImage(image)
  })
}
