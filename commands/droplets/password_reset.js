/**
 * @fileoverview Module handling the droplet password reset command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'password_reset <droplet id>'

exports.aliases = ['password', 'pw']

exports.description = 'Reset the password on a droplet'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.passwordReset(argv.dropletid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Droplet password reset.')
    display.displayActionID(action)
  })
}
