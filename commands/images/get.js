/**
 * @fileoverview Module handling the image getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'get <image id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about an image'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.images.get(argv.imageid, function(error, image) {
    Util.handleError(error);
    Display.displayImage(image);
  });
};
