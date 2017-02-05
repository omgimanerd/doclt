/**
 * @fileoverview Module handling the floating-ips assign command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'assign <floating ip> <droplet id>';

exports.description = 'Assign a floating IP to a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  var ip = argv.floatingip;
  client.floatingIps.assign(ip, argv.dropletid, (error, action) => {
    Util.handleError(error);
    Display.displayActionID(action);
  });
};
