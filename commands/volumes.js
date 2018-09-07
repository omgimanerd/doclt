/**
 * @fileoverview Module handling the volume subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../lib/util')

exports.command = 'volumes'

exports.aliases = ['volume', 'block', 'blockStorage']

exports.description = 'Create, delete, and manage volumes'.yellow

exports.builder = yargs => {
  yargs.commandDir('volumes')
    .demandCommand()
  util.globalConfig(yargs)
}
