/**
 * @fileoverview Module handling the ssh commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'ssh <command>';

exports.describe = 'Create, delete, and manage SSH public keys';

exports.builder = (yargs) => {
  yargs.commandDir('ssh');
};
