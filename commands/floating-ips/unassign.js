/**
 * @fileoverview Module handling the floating-ips unassign command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'unassign <floating ip>';

exports.description = 'Unassign a floating IP'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.floatingIps.unassign(argv.floatingip, (error, action) => {
    Util.handleError(error);
    Display.displayActionID(action);
  });
};
