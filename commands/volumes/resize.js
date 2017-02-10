/**
 * @fileoverview Module handling the volume resize command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'resize <volume id> <size>';

exports.description = 'Resize a volume'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.volumes.get(argv.volumeid, function(error, volume) {
    Util.handleError(error);
    var volumeid = argv.volumeid;
    var size = argv.size;
    var region = volume.region.slug;
    client.volumes.resize(volumeid, size, region, function(error, action) {
      Util.handleError(error);
      Display.displayAction(action, 'Volume resized.');
    });
  });
};
