/**
 * @fileoverview Module handling the floating IP action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'get <floating ip> <action id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a floating IP action'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var ip = argv.floatingip;
  var id = argv.actionid;
  client.floatingIps.getAction(ip, id, function(error, action) {
    Util.handleError(error);
    Display.displayAction(action);
  });
};
