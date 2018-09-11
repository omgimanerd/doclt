/**
 * @fileoverview Module handling the snapshot subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'snapshots'

exports.aliases = ['snapshot', 'snap']

exports.description = 'Create, delete, and manage snapshots'.yellow

exports.builder = yargs => {
  yargs.commandDir('snapshots').demandCommand()
}
