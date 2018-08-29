/**
 * @fileoverview Module handling the certificate subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../lib/util')

exports.command = 'certificates'

exports.aliases = ['certificate', 'cert', 'certs']

exports.description = 'Create, delete, and manage SSL certificates'.yellow

exports.builder = yargs => {
  yargs.commandDir('certificates')
  util.globalConfig(yargs, 1, exports.command, true)
}
