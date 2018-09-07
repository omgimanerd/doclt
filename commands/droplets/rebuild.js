/**
 * @fileoverview Module handling the droplet rebuild command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'rebuild <droplet id> <image id/slug>'

exports.description = 'Rebuild a droplet'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  const data = argv['imageid/slug']
  client.droplets.rebuild(argv.dropletid, data, (error, action) => {
    util.handleError(error)
    display.displayMessage('Rebuilding droplet...')
    display.displayActionID(action)
  })
}
