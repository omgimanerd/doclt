/**
 * @fileoverview Module handling the droplet shutdown command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'shutdown <droplet id>';

exports.description = 'Gracefully shut down a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.droplets.shutdown(argv.dropletid, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Shutting down droplet...');
  });
};
