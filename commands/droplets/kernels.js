/**
 * @fileoverview Module handling the droplet kernels subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'kernels';

exports.aliases = ['kernel'];

exports.description = 'List and change droplet kernels'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('kernels');
  Util.globalConfig(yargs, 2, exports.command, true);
};
