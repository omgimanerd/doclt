/**
 * @fileoverview Module handling the droplet rebuild command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'rebuild <droplet id> <image id/slug>'

exports.description = 'Rebuild a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const data = argv['imageid/slug']
  client.droplets.rebuild(argv.dropletid, data, (error, action) => {
    Util.handleError(error)
    display.displayMessage('Rebuilding droplet...')
    display.displayActionID(action)
  })
}
