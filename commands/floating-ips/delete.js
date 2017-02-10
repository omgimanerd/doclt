/**
 * @fileoverview Module handling the floating-ip delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <floating ip>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a floating IP'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var floatingip = argv.floatingip;
  client.floatingIps.delete(floatingip, function(error) {
    Util.handleError(error);
    Display.displayMessage('Floating IP {0} deleted.', floatingip);
  });
};
