/**
 * @fileoverview Module handling the droplet power subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'power';

exports.description = 'Reboot, power on, and power off a droplet'.yellow;

exports.builder = function(yargs) {
  yargs.commandDir('power');
  Util.globalConfig(yargs, 2, exports.command, true);
};
