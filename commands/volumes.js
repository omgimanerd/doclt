/**
 * @fileoverview Module handling the volume subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'volumes';

exports.aliases = ['volume'];

exports.description = 'Create, delete, and manage volumes'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('volumes');
  Util.globalConfig(yargs, 1, exports.command, true);
};
