/**
 * @fileoverview Module handling the droplet actions subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'actions';

exports.aliases = ['action'];

exports.description = 'List and fetch droplet actions'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('actions');
  Util.globalConfig(yargs, 1, exports.command, true);
};
