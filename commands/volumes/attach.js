/**
 * @fileoverview Module handling the volume attach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'attach <volume id> <droplet id>';

exports.description = 'Attach a volume'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var volumeid = argv.volumeid;
  var dropletid = argv.dropletid;
  client.volumes.attach(volumeid, dropletid, function(error, action) {
    Util.handleError(error);
    Display.displayAction(action, 'Volume attached.');
  });
};
