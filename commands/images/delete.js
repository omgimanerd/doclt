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
  var imageid = argv.imageid;
  client.images.delete(imageid, function(error) {
    Util.handleError(error);
    Display.displayMessage('Image {0} deleted.', imageid);
  });
};
