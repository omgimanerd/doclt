/**
 * @fileoverview Module handling the image subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../lib/util');

exports.command = 'images';

exports.aliases = ['image'];

exports.description = 'Create, delete, and manage images'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('images');
  util.globalConfig(yargs, exports.command, true);
};
