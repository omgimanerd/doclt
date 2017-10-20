/**
 * @fileoverview Module handling the domain subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Util = require('../lib/Util')

exports.command = 'domains'

exports.aliases = ['domain']

exports.description = 'Create, delete, and manage domains'.yellow

exports.builder = yargs => {
  yargs.commandDir('domains')
  Util.globalConfig(yargs, 1, exports.command, true)
}
