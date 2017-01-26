/**
 * @fileoverview Module handling the image getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'get <image id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about an image'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 1, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.images.get(argv.imageid, (error, image) => {
    Util.handleError(error);
    Display.displayImage(image);
  });
};
