/**
 * @fileoverview Module handling the volume resize command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'resize <volume id> <size>';

exports.description = 'Resize a volume'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.volumes.get(argv.volumeid, (error, volume) => {
    util.handleError(error, argv.json);
    var region = volume.region.slug;
    client.volumes.resize(argv.volumeid, argv.size, region, (error, action) => {
      util.handleError(error, argv.json);
      if (argv.json) {
        console.log(action);
      } else {
        console.log('Volume resized.'.red);
        console.log('Action ID: '.red + util.colorID(action.id));
      }
    });
  });
};
