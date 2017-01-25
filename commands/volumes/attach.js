/**
 * @fileoverview Module handling the volume attach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'attach <volume id> <droplet id>';

exports.description = 'Attach a volume'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.volumes.attach(argv.volumeid, argv.dropletid, (error, action) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Volume attached.'.red);
      console.log('Action ID: '.red + Util.colorID(action.id));
    }
  });
};
