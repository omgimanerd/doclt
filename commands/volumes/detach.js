/**
 * @fileoverview Module handling the volume detach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'detach <volume id>';

exports.description = 'Detach a volume'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.volumes.detach(argv.volumeid, function(error, action) {
    Util.handleError(error);
    Display.displayAction(action, 'Volume detached.');
  });
};
