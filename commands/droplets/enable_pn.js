/**
 * @fileoverview Module handling private networking enable command for
 *   droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'enable_pn <droplet id>';

exports.aliases = ['enable_private_networking'];

exports.description = 'Enable private networking on a droplet.'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var dropletid = argv.dropletid;
  client.droplets.enablePrivateNetworking(dropletid, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Private networking enabled.');
  });
};
