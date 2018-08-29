/**
 * @fileoverview Module handling the image subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../lib/util')

exports.command = 'images'

exports.aliases = ['image']

exports.description = 'Create, delete, and manage images'.yellow

exports.builder = yargs => {
  yargs.commandDir('images')
  util.globalConfig(yargs, 1, exports.command, true)
}
