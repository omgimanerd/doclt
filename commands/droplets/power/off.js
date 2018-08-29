/**
 * @fileoverview Module handling the droplet power off command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'off <droplet id>'

exports.description = 'Power off a droplet (hard shutdown)'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.powerOff(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Powering off droplet...')
    display.displayActionID(action)
  })
}
