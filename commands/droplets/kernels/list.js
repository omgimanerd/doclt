/**
 * @fileoverview Module handling the kernels listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'list <droplet id>'

exports.description = 'List kernels of a droplet'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.kernels(argv.dropletid, (error, kernels) => {
    util.handleError(error)
    display.displayKernels(kernels)
  })
}
