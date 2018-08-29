/**
 * @fileoverview Module handling the droplet actions subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../../lib/util')

exports.command = 'actions'

exports.aliases = ['action']

exports.description = 'List and fetch droplet actions'.yellow

exports.builder = yargs => {
  yargs.commandDir('actions')
  util.globalConfig(yargs, 2, exports.command, true)
}
