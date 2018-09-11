/**
 * @fileoverview Module handling the certificate subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'certificates'

exports.aliases = ['certificate', 'cert', 'certs']

exports.description = 'Create, delete, and manage SSL certificates'.yellow

exports.builder = yargs => {
  yargs.commandDir('certificates').demandCommand()
}
