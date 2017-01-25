/**
 * @fileoverview Module handling the droplet action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'get <droplet id> <action id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a droplet action'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.getAction(
      argv.dropletid, argv.actionid, Display.displayAction);
};
