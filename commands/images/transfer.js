/**
 * @fileoverview Module handling the image transfer command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'transfer <image id> <region>';

exports.description = 'Transfer an image to another region'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.images.transfer(argv.imageid, argv.region, (error, action) => {
    Util.handleError(error);
    Display.displayActionID(action);
  });
};
