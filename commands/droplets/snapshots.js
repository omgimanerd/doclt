/**
 * @fileoverview Module handling the droplet snapshots subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'snapshots';

exports.aliases = ['snapshot'];

exports.description = 'List and take snapshots of a droplet'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('snapshots');
  Util.globalConfig(yargs, 2, exports.command, true);
};
