/**
 * @fileoverview Module handling the droplet getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <droplet id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a droplet'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.get(argv.dropletid, (error, droplet) => {
    util.handleError(error)
    display.displayDroplet(droplet)
  })
}
