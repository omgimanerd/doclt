/**
 * @fileoverview Module handling the volume actions subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'actions'

exports.aliases = ['action']

exports.description = 'List and fetch volume actions'.yellow

exports.builder = yargs => {
  yargs.commandDir('actions').demandCommand()
}
