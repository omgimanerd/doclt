/**
 * @fileoverview Module handling the image renaming command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'rename <image id> <name>';

exports.aliases = ['update'];

exports.description = 'Rename an image'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.images.update(argv.imageid, {
    name: argv.name
  }, function(error, image) {
    Util.handleError(error);
    Display.displayImage(image);
  });
};
