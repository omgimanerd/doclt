/**
 * @fileoverview Module handling the droplet restore command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'restore <droplet id> <backup id>';

exports.description = 'Restore a droplet from a backup'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var dropletid = argv.dropletid;
  var backupid = argv.backupid;
  client.droplets.restore(dropletid, backupid, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Restoring droplet from backup...');
  });
};
