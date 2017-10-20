/**
 * @fileoverview Module handling the listing of possible droplet regions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../lib/Display')
const Util = require('../lib/Util')

exports.command = 'regions'

exports.aliases = ['region']

exports.description = 'Lists the available regions'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 1, exports.command)
}

exports.handler = () => {
  const client = Util.getClient()
  client.regions.list((error, regions) => {
    Util.handleError(error)
    Display.displayRegions(regions)
  })
}
