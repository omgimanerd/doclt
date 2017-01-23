/**
 * @fileoverview Module handling the volume attach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'attach <volume id> <droplet id>';

exports.description = 'Attach a volume'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.volumes.attach(argv.volumeid, argv.dropletid, (error, action) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Volume attached'.red);
      console.log('Action ID: '.red + action.id);
    }
  });
};
