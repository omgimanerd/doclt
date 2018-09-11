/**
 * @fileoverview Module handling the droplet resize command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'resize <droplet id> <size slug>'

exports.description = 'Resize a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.resize(argv.dropletid, argv.sizeslug, (error, action) => {
    util.handleError(error)
    display.displayMessage('Resizing droplet...')
    display.displayActionID(action)
  })
}
