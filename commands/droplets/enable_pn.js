/**
 * @fileoverview Module handling private networking enable command for
 *   droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'enable_pn <droplet id>'

exports.aliases = ['enable_private_networking']

exports.description = 'Enable private networking on a droplet.'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.enablePrivateNetworking(argv.dropletid, (error, action) => {
    Util.handleError(error)
    display.displayMessage('Private networking enabled.')
    display.displayActionID(action)
  })
}
