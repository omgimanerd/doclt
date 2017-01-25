/**
 * @fileoverview Module handling the SSH key delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'delete <key id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete an SSH key'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.account.deleteSshKey(argv.keyid, (error, key, headers) => {
    Util.handleError(error, argv.json);
    var message = 'SSH Key deleted.';
    if (argv.json) {
      console.log({ message: message });
    } else {
      console.log(message.red); 
    }
  });
};
