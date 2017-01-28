/**
 * @fileoverview Module handling the droplet snapshotting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'take <droplet id> <snapshot name>';

exports.aliases = ['create', 'add'];

exports.description = 'Take a snapshot of a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.snapshot(argv.dropletid, {
    name: argv.snapshotname
  }, (error, action) => {
    Util.handleError(error);
    Display.displayAction(action, 'Snapshot taken.');
  });
};
