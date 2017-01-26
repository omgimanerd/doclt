/**
 * @fileoverview Module handling the disabling of automatic backups for
 *   droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'disable <droplet id>';

exports.aliases = ['off'];

exports.description = 'Disable automatic backups for a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.disableBackups(argv.dropletid, (error, action) => {
    Util.handleError(error);
    Display.displayActionID(action, 'Automatic backups disabled.');
  });
};
