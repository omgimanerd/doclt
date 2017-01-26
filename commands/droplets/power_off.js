/**
 * @fileoverview Module handling the droplet power off command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'power_off <droplet id>';

exports.aliases = ['poweroff', 'off'];

exports.description = 'Power off a droplet (hard)'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.powerOff(argv.dropletid, (error, action) => {
    Util.handleError(error);
    Display.displayActionID(action, 'Powering off droplet');
  });
};
