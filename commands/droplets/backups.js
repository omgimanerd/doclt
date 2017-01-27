/**
 * @fileoverview Module handling the droplet backups subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'backups';

exports.aliases = ['backup'];

exports.description = 'List and enable/disable automatic backups'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('backups');
  Util.globalConfig(yargs, 2, exports.command, true);
};
