/**
 * @fileoverview Module handling the image action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'get <image id> <action id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about an image action'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.images.getAction(argv.imageid, argv.actionid, (error, action) => {
    Util.handleError(error);
    Display.displayAction(action);
  });
};
