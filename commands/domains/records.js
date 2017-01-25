/**
 * @fileoverview Module handling the domain record commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'records';

exports.aliases = ['record'];

exports.description = 'Create, delete, and manage domain records'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('records');
  Util.globalConfig(yargs, exports.command, true);
};
