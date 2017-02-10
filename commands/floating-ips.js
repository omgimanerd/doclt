/**
 * @fileoverview Module handling the floating-ip subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'floating-ips';

exports.aliases = ['floating-ip', 'fip', 'ip'];

exports.description = 'Create, delete, and manage floating IPs'.yellow;

exports.builder = function(yargs) {
  yargs.commandDir('floating-ips');
  Util.globalConfig(yargs, 1, exports.command, true);
};
