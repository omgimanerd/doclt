/**
 * @fileoverview Module handling the listing of possible droplet sizes.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../lib/Display')
const Util = require('../lib/Util')

exports.command = 'sizes'

exports.aliases = ['size']

exports.description = 'Lists the available droplet sizes'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 1, exports.command)
}

exports.handler = () => {
  const client = Util.getClient()
  client.sizes.list((error, sizes) => {
    Display.displaySizes(sizes)
  })
}
