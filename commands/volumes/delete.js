/**
 * @fileoverview Module handling the volume delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <volume id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a volume'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var volumeid = argv.volumeid;
  client.volumes.delete(volumeid, function(error) {
    Util.handleError(error);
    Display.displayMessage('Volume {0} deleted.', volumeid);
  });
};
