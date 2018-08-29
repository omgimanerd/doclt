/**
 * @fileoverview Module handling the droplet subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../lib/util')

exports.command = 'droplets'

exports.aliases = ['droplet']

exports.description = 'Create, delete, and manage droplets'.yellow

exports.builder = yargs => {
  yargs.commandDir('droplets')
  util.globalConfig(yargs, 1, exports.command, true)
}
