/**
 * @fileoverview Module handling the image action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'get <image id> <action id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about an image action'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var imageid = argv.imageid;
  var actionid = argv.actionid;
  client.images.getAction(imageid, actionid, function(error, action) {
    Util.handleError(error);
    Display.displayAction(action);
  });
};
