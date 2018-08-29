/**
 * @fileoverview Module handling the droplet reboot command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'reboot <droplet id>'

exports.aliases = ['restart']

exports.description = 'Gracefully reboot a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.reboot(argv.dropletid, (error, action) => {
    Util.handleError(error)
    display.displayMessage('Rebooting droplet...')
    display.displayActionID(action)
  })
}
