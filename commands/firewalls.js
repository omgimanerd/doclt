/**
 * @fileoverview Module handling the firewall subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'firewalls'

exports.aliases = ['firewall', 'fw']

exports.description = 'Create, delete, and manage firewalls'.yellow

exports.builder = yargs => {
  yargs.commandDir('firewalls').demandCommand()
}
