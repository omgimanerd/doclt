/**
 * @fileoverview Module handling the SSH key delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <key id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete an SSH key'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 1, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.account.deleteSshKey(argv.keyid, (error) => {
    Util.handleError(error);
    Display.displayMessage('SSH Key deleted.');
  });
};
