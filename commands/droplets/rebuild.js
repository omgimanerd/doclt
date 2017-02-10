/**
 * @fileoverview Module handling the droplet rebuild command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'rebuild <droplet id> <image id/slug>';

exports.description = 'Rebuild a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var data = argv['imageid/slug'];
  client.droplets.rebuild(argv.dropletid, data, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Rebuilding droplet...');
  });
};
