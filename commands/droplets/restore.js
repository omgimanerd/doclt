/**
 * @fileoverview Module handling the droplet restore command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'restore <droplet id> <backup id>'.yellow;

exports.description = 'Restore a droplet from a backup'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.restore(argv.dropletid, argv.backupid, (error, action) => {
    Util.handleError(error);
    Display.displayActionID(action, 'Restoring droplet from backup...');
  });
};
