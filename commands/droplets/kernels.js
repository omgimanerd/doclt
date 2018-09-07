/**
 * @fileoverview Module handling the droplet kernels subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../../lib/util')

exports.command = 'kernels'

exports.aliases = ['kernel']

exports.description = 'List and change droplet kernels'.yellow

exports.builder = yargs => {
  yargs.commandDir('kernels')
    .demandCommand()
  util.globalConfig(yargs)
}
