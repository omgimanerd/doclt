/**
 * @fileoverview Module handling the image subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'images';

exports.aliases = ['image'];

exports.description = 'Create, delete, and manage images'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('images')
    .epilogue('See \'docli <command> --help\' for more info.')
    .demandCommand(1);
};
