/**
 * @fileoverview Module handling the droplet reboot command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'reboot <droplet id>';

exports.aliases = ['restart'];

exports.description = 'Gracefully reboot a droplet'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.reboot(argv.dropletid, (error, action) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Rebooting droplet.'.red);
      console.log('Action ID: '.red + util.colorID(action.id));
    }
  });
};
