/**
 * @fileoverview Module handling the image subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Util = require('../lib/Util')

exports.command = 'images'

exports.aliases = ['image']

exports.description = 'Create, delete, and manage images'.yellow

exports.builder = yargs => {
  yargs.commandDir('images')
  Util.globalConfig(yargs, 1, exports.command, true)
}
