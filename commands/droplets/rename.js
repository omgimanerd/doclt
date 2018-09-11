/**
 * @fileoverview Module handling the droplet renaming command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'rename <droplet id> <name>'

exports.description = 'Rename a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.rename(argv.dropletid, argv.name, (error, action) => {
    util.handleError(error)
    display.displayMessage('Droplet renamed.')
    display.displayActionID(action)
  })
}
