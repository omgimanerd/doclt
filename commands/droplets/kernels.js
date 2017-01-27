/**
 * @fileoverview Module handling the kernels listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'kernels <droplet id>';

exports.description = 'List kernels of a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.kernels(argv.dropletid, (error, kernels) => {
    Util.handleError(error);
    Display.displayKernels(kernels);
  });
};
