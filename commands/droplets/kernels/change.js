/**
 * @fileoverview Module handling the droplet kernel changing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'change <droplet id> <kernel id>';

exports.description = 'Change the kernel of a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var dropletid = argv.dropletid;
  var kernelid = argv.kernelid;
  client.droplets.changeKernel(dropletid, kernelid, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Changing droplet kernel...');
  });
};
