/**
 * @fileoverview Module handling the domain record commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'records <command> [arguments..]';

exports.aliases = ['record'];

exports.description = 'Create, delete, and manage domain records'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('records');
  util.globalConfig(yargs, exports.command, true);
};
