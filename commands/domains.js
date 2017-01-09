/**
 * @fileoverview Module handling the domain commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'domains';

exports.description = 'Create, delete, and manage domains'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('domains')
    .demandCommand(1);
};
