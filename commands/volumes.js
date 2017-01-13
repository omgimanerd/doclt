/**
 * @fileoverview Module handling the volume subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'volumes';

exports.aliases = ['volume'];

exports.description = 'Create, delete, and manage volumes'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('volumes')
    .epilogue('See \'docli <command> --help\' for more info.')
    .demandCommand(1);
};
