/**
 * @fileoverview Module handling the ssh commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../lib/util')

exports.command = 'ssh'

exports.description = 'Create, delete, and manage SSH public keys'.yellow

exports.builder = yargs => {
  yargs.commandDir('ssh')
    .demandCommand()
  util.globalConfig(yargs)
}
