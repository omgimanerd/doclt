/**
 * @fileoverview Module handling the droplet action subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'actions';

exports.aliases = ['action'];

exports.description = 'View droplet actions'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('actions');
  util.globalConfig(yargs, exports.command);
}
