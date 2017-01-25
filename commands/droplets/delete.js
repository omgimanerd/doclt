/**
 * @fileoverview Module handling the droplet delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'delete <droplet id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.delete(argv.dropletid, (error) => {
    Util.handleError(error, argv.json);
    var message = 'Droplet deleted.';
    if (argv.json) {
      console.log({ message: message });
    } else {
      console.log(message.red);
    }
  });
};
