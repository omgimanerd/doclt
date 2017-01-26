/**
 * @fileoverview Module handling the enabling of automatic backups for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'enable <droplet id>';

exports.aliases = ['on'];

exports.description = 'Enable automatic backups for a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.enableBackups(argv.dropletid, (error, action) => {
    Util.handleError(error);
    Display.displayActionID(action, 'Automatic backups enabled.');
  });
};
