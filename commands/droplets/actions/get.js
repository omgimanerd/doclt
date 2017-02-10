/**
 * @fileoverview Module handling the droplet action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'get <droplet id> <action id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a droplet action'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var dropletid = argv.dropletid;
  var actionid = argv.actionid;
  client.droplets.getAction(dropletid, actionid, function(error, action) {
    Util.handleError(error);
    Display.displayAction(action);
  });
};
