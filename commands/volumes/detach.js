/**
 * @fileoverview Module handling the volume detach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'detach <volume id>';

exports.description = 'Detach a volume'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.volumes.detach(argv.volumeid, (error, action) => {
    Util.handleError(error);
    Display.displayAction(action, 'Volume detached.');
  });
};
