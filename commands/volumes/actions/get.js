/**
 * @fileoverview Module handling the volume action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'get <volume id> <action id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a volume action'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.volumes.getAction(argv.volumeid, argv.actionid, (error, action) => {
    Util.handleError(error);
    Display.displayAction(action);
  });
};
