/**
 * @fileoverview Module handling the droplet listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all droplets'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = () => {
  const client = Util.getClient()
  client.droplets.list((error, droplets) => {
    Util.handleError(error)
    display.displayDroplets(droplets)
  })
}
