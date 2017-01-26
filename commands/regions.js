/**
 * @fileoverview Module handling the listing of possible droplet regions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../lib/Display');
var Util = require('../lib/Util');

exports.command = 'regions';

exports.aliases = ['region'];

exports.description = 'Lists the available regions'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.regions.list((error, regions) => {
    Util.handleError(error);
    Display.displayRegions(regions);
  });
};
