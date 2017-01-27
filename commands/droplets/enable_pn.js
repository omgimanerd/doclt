/**
 * @fileoverview Module handling private networking enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'enable_pn <droplet id>';

exports.aliases = ['enable_private_networking'];

exports.description = 'Enable private networking on a droplet.'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.enablePrivateNetworking(argv.dropletid, (error, action) => {
    Util.handleError(error);
    Display.displayActionID(action, 'Private networking enabled.');
  });
};
