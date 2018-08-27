/**
 * @fileoverview Module handling the droplet delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
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
    Display.displayMessage('Droplet {0} deleted.', argv.dropletid)
  })
}
