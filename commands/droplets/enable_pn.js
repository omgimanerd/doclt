/**
 * @fileoverview Module handling private networking enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'enable_pn <droplet id>';

exports.aliases = ['enable_private_networking'];

exports.description = 'Enable private networking on a droplet.'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.enablePrivateNetworking(argv.dropletid, (error, action) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Private networking enabled.'.red);
      console.log('Action ID: '.red + Util.colorID(action.id));
    }
  });
};
