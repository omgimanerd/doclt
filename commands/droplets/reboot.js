/**
 * @fileoverview Module handling the droplet reboot command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'reboot <droplet id>';

exports.aliases = ['restart'];

exports.description = 'Gracefully reboot a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.reboot(argv.dropletid, (error, action) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Rebooting droplet.'.red);
      console.log('Action ID: '.red + Util.colorID(action.id));
    }
  });
};
