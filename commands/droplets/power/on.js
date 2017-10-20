/**
 * @fileoverview Module handling the droplet power on command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../../lib/Display')
const Util = require('../../../lib/Util')

exports.command = 'on <droplet id>'

exports.description = 'Power on a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.powerOn(argv.dropletid, (error, action) => {
    Util.handleError(error)
    Display.displayActionID(action, 'Powering on droplet...')
  })
}
