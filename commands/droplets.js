/**
 * @fileoverview Module handling the droplet commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'droplets <command>';

exports.description = 'Create, delete, and manage droplets';

exports.builder = (yargs) => {
  yargs.commandDir('droplets');
};
