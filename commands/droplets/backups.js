/**
 * @fileoverview Module handling the droplet backups subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'backups';

exports.aliases = ['backup'];

exports.description = 'List and enable/disable automatic backups'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('backups');
  util.globalConfig(yargs, exports.command, true);
};
