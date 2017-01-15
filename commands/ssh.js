/**
 * @fileoverview Module handling the ssh commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../lib/util');

exports.command = 'ssh';

exports.description = 'Create, delete, and manage SSH public keys'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('ssh')
    .demandCommand(1);
  util.globalConfig(yargs);
};
