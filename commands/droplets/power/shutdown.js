/**
 * @fileoverview Module handling the droplet shutdown command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'shutdown <droplet id>'

exports.description = 'Gracefully shut down a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.shutdown(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Shutting down droplet...')
    display.displayActionID(action)
  })
}
