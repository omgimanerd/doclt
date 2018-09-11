/**
 * @fileoverview Module handling the droplet kernel changing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'change <droplet id> <kernel id>'

exports.description = 'Change the kernel of a droplet'.yellow

exports.handler = argv => {
  const client = util.getClient()
  const dropletid = argv.dropletid
  const kernelid = argv.kernelid
  client.droplets.changeKernel(dropletid, kernelid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Changing droplet kernel...')
    display.displayActionID(action)
  })
}
