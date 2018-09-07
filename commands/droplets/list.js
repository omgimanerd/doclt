/**
 * @fileoverview Module handling the droplet listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all droplets'.yellow

exports.builder = util.globalConfig

exports.handler = () => {
  const client = util.getClient()
  client.droplets.list((error, droplets) => {
    util.handleError(error)
    display.displayDroplets(droplets)
  })
}
