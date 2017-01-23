/**
 * @fileoverview Module handling the volume actions subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'actions';

exports.aliases = ['action'];

exports.description = 'List and fetch volume actions'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('actions');
  util.globalConfig(yargs, exports.command, true);
};
