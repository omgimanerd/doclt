/**
 * @fileoverview Module handling the droplet shutdown command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'shutdown <droplet id>'

exports.description = 'Gracefully shut down a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.shutdown(argv.dropletid, (error, action) => {
    Util.handleError(error)
    display.displayMessage('Shutting down droplet...')
    display.displayActionID(action)
  })
}
