/**
 * @fileoverview Module handling the kernels listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'list <droplet id>'

exports.description = 'List kernels of a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.kernels(argv.dropletid, (error, kernels) => {
    Util.handleError(error)
    display.displayKernels(kernels)
  })
}
