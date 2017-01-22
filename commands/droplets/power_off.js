/**
 * @fileoverview Module handling the droplet power off command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'power_off <droplet id>';

exports.aliases = ['poweroff', 'off'];

exports.description = 'Power off a droplet (hard)'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.powerOff(argv.dropletid, (error, action) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Powering off droplet.'.red);
      console.log('Action ID: '.red + action.id.toString().bold.cyan);
    }
  });
};
