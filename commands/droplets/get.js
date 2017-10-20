/**
 * @fileoverview Module handling the droplet getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'get <droplet id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.get(argv.dropletid, (error, droplet) => {
    Util.handleError(error)
    Display.displayDroplet(droplet)
  })
}
