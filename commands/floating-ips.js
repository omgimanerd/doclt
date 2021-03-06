/**
 * @fileoverview Module handling the floating-ip subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'floating-ips'

exports.aliases = ['floating-ip', 'fip', 'ip']

exports.description = 'Create, delete, and manage floating IPs'.yellow

exports.builder = yargs => {
  yargs.commandDir('floating-ips').demandCommand()
}
