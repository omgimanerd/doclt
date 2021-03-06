/**
 * @fileoverview Module handling the image actions subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'actions'

exports.aliases = ['action']

exports.description = 'List and fetch image actions'.yellow

exports.builder = yargs => {
  yargs.commandDir('actions').demandCommand()
}
