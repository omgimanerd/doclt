/**
 * @fileoverview Module handling the domain subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'domains';

exports.aliases = ['domain'];

exports.description = 'Create, delete, and manage domains'.yellow;

exports.builder = function(yargs) {
  yargs.commandDir('domains');
  Util.globalConfig(yargs, 1, exports.command, true);
};
