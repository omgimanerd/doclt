/**
 * @fileoverview Module handling the droplet getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'get <droplet id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.droplets.get(argv.dropletid, function(error, droplet) {
    Util.handleError(error);
    Display.displayDroplet(droplet);
  });
};
