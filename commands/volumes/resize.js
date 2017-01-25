/**
 * @fileoverview Module handling the volume resize command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'resize <volume id> <size>';

exports.description = 'Resize a volume'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.volumes.get(argv.volumeid, (error, volume) => {
    Util.handleError(error);
    var region = volume.region.slug;
    client.volumes.resize(argv.volumeid, argv.size, region, (error, action) => {
      Util.handleError(error);
      if (argv.json) {
        console.log(action);
      } else {
        console.log('Volume resized.'.red);
        console.log('Action ID: '.red + Util.colorID(action.id));
      }
    });
  });
};
