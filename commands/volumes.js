/**
 * @fileoverview Module handling the volume subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../lib/util');

exports.command = 'volumes';

exports.aliases = ['volume'];

exports.description = 'Create, delete, and manage volumes'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('volumes');
  util.globalConfig(yargs);
};
