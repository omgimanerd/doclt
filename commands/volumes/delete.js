/**
 * @fileoverview Module handling the volume delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <volume id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a volume'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.volumes.delete(argv.volumeid, (error) => {
    Util.handleError(error);
    Display.displayMessage('Volume deleted.');
  });
};
