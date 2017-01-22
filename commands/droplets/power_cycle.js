/**
 * @fileoverview Module handling the droplet power cycling command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'power_cycle <droplet id>';

exports.aliases = ['powercycle'];

exports.description = 'Power cycle a droplet (hard reset)'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.powerCycle(argv.dropletid, (error, action) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Power cycling droplet.'.red);
      console.log('Action ID: '.red + action.id.toString().bold.cyan);
    }
  });
};
