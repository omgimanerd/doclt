/**
 * @fileoverview Module handling the droplet password reset command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'password_reset <droplet id>'

exports.aliases = ['password', 'pw']

exports.description = 'Reset the password on a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.passwordReset(argv.dropletid, (error, action) => {
    Util.handleError(error)
    Display.displayMessage('Droplet password reset.')
    Display.displayActionID(action)
  })
}
