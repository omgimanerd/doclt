/**
 * @fileoverview Module handling the droplet renaming command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'rename <droplet id> <name>'

exports.description = 'Rename a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.rename(argv.dropletid, argv.name, (error, action) => {
    Util.handleError(error)
    Display.displayActionID(action, 'Droplet renamed.')
  })
}
