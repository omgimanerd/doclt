/**
 * @fileoverview Module handling the droplet power cycling command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'power_cycle <droplet id>';

exports.aliases = ['powercycle'];

exports.description = 'Power cycle a droplet (hard reset)'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.powerCycle(argv.dropletid, (error, action) => {
    Util.handleError(error);
    Display.displayActionID(action, 'Power cycling droplet.');
  });
};
