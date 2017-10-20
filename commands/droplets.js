/**
 * @fileoverview Module handling the droplet subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Util = require('../lib/Util')

exports.command = 'droplets'

exports.aliases = ['droplet']

exports.description = 'Create, delete, and manage droplets'.yellow

exports.builder = yargs => {
  yargs.commandDir('droplets')
  Util.globalConfig(yargs, 1, exports.command, true)
}
