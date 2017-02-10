/**
 * @fileoverview Module handling the droplet delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <droplet id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var dropletid = argv.dropletid;
  client.droplets.delete(dropletid, function(error) {
    Util.handleError(error);
    Display.displayMessage('Droplet {0} deleted.', dropletid);
  });
};
