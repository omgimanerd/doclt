/**
 * @fileoverview Module handling the image delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <image id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete an image'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.images.delete(argv.imageid, function(error) {
    Util.handleError(error);
    Display.displayMessage('Image deleted.');
  });
};
