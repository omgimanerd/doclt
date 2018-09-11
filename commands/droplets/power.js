/**
 * @fileoverview Module handling the droplet power subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'power'

exports.description = 'Reboot, power on, and power off a droplet'.yellow

exports.builder = yargs => {
  yargs.commandDir('power').demandCommand()
}
