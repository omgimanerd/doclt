/**
 * @fileoverview Module handling the domain commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../lib/util');

exports.command = 'domains';

exports.aliases = ['domain'];

exports.description = 'Create, delete, and manage domains'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('domains');
  util.globalConfig(yargs, exports.command, true);
};
