/**
 * @fileoverview Module handling the token setting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Util = require('../lib/Util')

const config = require('../lib/config')

exports.command = 'token <token>'

exports.aliases = ['auth', 'authenticate']

exports.description = 'Set the DigitalOcean auth token'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 1, exports.command)
}

exports.handler = argv => {
  config.setToken(argv.token, error => {
    Util.handleError(error)
    console.log('Token supplied!'.green)
    console.log('This will have no effect if you have supplied a '.red +
        'DOCLT_TOKEN environment variable'.red)
  })
}
