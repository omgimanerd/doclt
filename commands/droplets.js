/**
 * @fileoverview Module handling the droplet subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'droplets'

exports.aliases = ['droplet']

exports.description = 'Create, delete, and manage droplets'.yellow

exports.builder = yargs => {
  yargs.commandDir('droplets').demandCommand()
}
