/**
 * @fileoverview Module handling the droplet delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'delete <droplet id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.delete(argv.dropletid, error => {
    Util.handleError(error)
    display.displayMessage(`Droplet ${argv.dropletid} deleted.`)
  })
}
