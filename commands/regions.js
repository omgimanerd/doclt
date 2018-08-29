/**
 * @fileoverview Module handling the listing of possible droplet regions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../lib/display')
const util = require('../lib/util')

exports.command = 'regions'

exports.aliases = ['region']

exports.description = 'Lists the available regions'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 1, exports.command)
}

exports.handler = () => {
  const client = util.getClient()
  client.regions.list((error, regions) => {
    util.handleError(error)
    display.displayRegions(regions)
  })
}
