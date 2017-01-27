/**
 * @fileoverview Module handling the tag subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = ['tags'];

exports.aliases = ['tag'];

exports.description = 'Create, delete, and manage tags'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('tags');
  Util.globalConfig(yargs, 0, exports.command, true);
};
