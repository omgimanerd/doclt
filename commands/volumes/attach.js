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

  client.volumes.attach(argv.volumeid, argv.dropletid, (error) => {
    util.handleError(error, argv.json);
    var message = 'Volume attached';
    if (argv.json) {
      console.log({ message: message });
    } else {
      console.log(message.red);
    }
  });
};
