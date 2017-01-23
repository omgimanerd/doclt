/**
 * @fileoverview Module handling the droplet power on command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'power_on <droplet id>';

exports.aliases = ['poweron', 'on'];

exports.description = 'Power on a droplet'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.powerOn(argv.dropletid, (error, action) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Powering on droplet.'.red);
      console.log('Action ID: '.red + util.colorID(action.id));
    }
  });
};
