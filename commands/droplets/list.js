/**
 * @fileoverview Module handling the droplet listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all droplets'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 1, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.list((error, droplets) => {
    Util.handleError(error);
    Display.displayDroplets(droplets);
  });
};
