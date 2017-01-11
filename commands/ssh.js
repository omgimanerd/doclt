/**
 * @fileoverview Module handling the ssh commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'ssh';

exports.description = 'Create, delete, and manage SSH public keys'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('ssh')
    .epilogue('See \'docli <command> --help\' for more info.')
    .demandCommand(1);
};
