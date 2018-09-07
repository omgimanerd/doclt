/**
 * @fileoverview Module handling the droplet backups subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../../lib/util')

exports.command = 'backups'

exports.aliases = ['backup']

exports.description = 'List and enable/disable automatic backups'.yellow

exports.builder = yargs => {
  yargs.commandDir('backups')
    .demandCommand()
  util.globalConfig(yargs)
}
