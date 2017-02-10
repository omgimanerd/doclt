/**
 * @fileoverview Module handling the droplet renaming command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'rename <droplet id> <name>';

exports.description = 'Rename a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.droplets.rename(argv.dropletid, argv.name, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Droplet renamed.');
  });
};
