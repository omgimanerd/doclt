/**
 * @fileoverview Module handling the IPv6 enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'enable_ipv6 <droplet id>';

exports.aliases = ['ipv6'];

exports.description = 'Enable IPv6 on a droplet.'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.droplets.enableIpv6(argv.dropletid, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'IPv6 enabled.');
  });
};
