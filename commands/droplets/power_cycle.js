/**
 * @fileoverview Module handling the droplet power cycling command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

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
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Power cycling droplet.'.red);
      console.log('Action ID: '.red + Util.colorID(action.id));
    }
  });
};
