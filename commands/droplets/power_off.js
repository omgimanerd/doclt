/**
 * @fileoverview Module handling the droplet power off command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

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
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Powering off droplet.'.red);
      console.log('Action ID: '.red + Util.colorID(action.id));
    }
  });
};
