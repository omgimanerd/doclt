/**
 * @fileoverview Module handling the tag subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../lib/util')

exports.command = ['tags']

exports.aliases = ['tag']

exports.description = 'Create, delete, and manage tags'.yellow

exports.builder = yargs => {
  yargs.commandDir('tags')
  util.globalConfig(yargs, 1, exports.command, true)
}
