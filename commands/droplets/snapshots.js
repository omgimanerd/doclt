/**
 * @fileoverview Module handling the droplet snapshots subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'snapshots'

exports.aliases = ['snapshot', 'snap']

exports.description = 'List and take snapshots of a droplet'.yellow

exports.builder = yargs => {
  yargs.commandDir('snapshots').demandCommand()
}
