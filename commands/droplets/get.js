/**
 * @fileoverview Module handling the droplet getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'get <droplet id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 1, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.get(argv.dropletid, (error, droplet) => {
    Util.handleError(error);
    Display.displayDroplet(droplet);
  });
};
