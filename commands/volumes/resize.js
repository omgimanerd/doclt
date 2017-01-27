/**
 * @fileoverview Module handling the volume resize command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'resize <volume id> <size>';

exports.description = 'Resize a volume'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.volumes.get(argv.volumeid, (error, volume) => {
    Util.handleError(error);
    var region = volume.region.slug;
    client.volumes.resize(argv.volumeid, argv.size, region, (error, action) => {
      Util.handleError(error);
      Display.displayAction(action, 'Volume resized.');
    });
  });
};
