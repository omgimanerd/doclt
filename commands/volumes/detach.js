/**
 * @fileoverview Module handling the volume detach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'detach <volume id>';

exports.description = 'Detach a volume'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.volumes.detach(argv.volumeid, (error, action) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Volume detached.'.red);
      console.log('Action ID: '.red + Util.colorID(action.id));
    }
  });
};
