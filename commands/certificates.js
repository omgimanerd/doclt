/**
 * @fileoverview Module handling the certificate subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Util = require('../lib/Util')

exports.command = 'certificates'

exports.aliases = ['certificate']

exports.description = 'Create, delete, and manage certificates'.yellow

exports.builder = yargs => {
  yargs.commandDir('certificates')
  Util.globalConfig(yargs, 1, exports.command, true)
}
