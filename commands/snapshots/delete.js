/**
 * @fileoverview Module handling the snapshot delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <snapshot id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a snapshot'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var snapshotid = argv.snapshotid;
  client.snapshots.delete(snapshotid, function(error) {
    Util.handleError(error);
    Display.displayMessage('Snapshot {0} deleted.', snapshotid);
  });
};
