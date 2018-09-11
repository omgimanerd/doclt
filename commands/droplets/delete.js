/**
 * @fileoverview Module handling the droplet delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <droplet id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.delete(argv.dropletid, error => {
    util.handleError(error)
    display.displayMessage(`Droplet ${argv.dropletid} deleted.`)
  })
}
