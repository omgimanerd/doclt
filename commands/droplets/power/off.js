/**
 * @fileoverview Module handling the droplet power off command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'off <droplet id>'

exports.description = 'Power off a droplet (hard shutdown)'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.powerOff(argv.dropletid, (error, action) => {
    Util.handleError(error)
    display.displayMessage('Powering off droplet...')
    display.displayActionID(action)
  })
}
