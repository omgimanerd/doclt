/**
 * @fileoverview Module handling the droplet resize command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'resize <droplet id> <size slug>';

exports.description = 'Resize a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var dropletid = argv.dropletid;
  var sizeslug = argv.sizeslug;
  client.droplets.resize(dropletid, sizeslug, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Resizing droplet...');
  });
};
