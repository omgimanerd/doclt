/**
 * @fileoverview Module handling the domain commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'domains';

exports.aliases = ['domain'];

exports.description = 'Create, delete, and manage domains'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('domains');
  Util.globalConfig(yargs, exports.command, true);
};
