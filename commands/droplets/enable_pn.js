/**
 * @fileoverview Module handling private networking enable command for
 *   droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'enable_pn <droplet id>'

exports.aliases = ['enable_private_networking']

exports.description = 'Enable private networking on a droplet.'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.enablePrivateNetworking(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Private networking enabled.')
    display.displayActionID(action)
  })
}
