/**
 * @fileoverview Module handling the droplet kernel changing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'change <droplet id> <kernel id>'

exports.description = 'Change the kernel of a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const dropletid = argv.dropletid
  const kernelid = argv.kernelid
  client.droplets.changeKernel(dropletid, kernelid, (error, action) => {
    Util.handleError(error)
    display.displayMessage('Changing droplet kernel...')
    display.displayActionID(action)
  })
}
