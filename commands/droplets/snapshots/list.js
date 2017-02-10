/**
 * @fileoverview Module handling the snapshot listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'list <droplet id>';

exports.aliases = ['ls'];

exports.description = 'List snapshots made of a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.droplets.snapshots(argv.dropletid, function(error, snapshots) {
    Util.handleError(error);
    Display.displaySnapshots(snapshots);
  });
};
