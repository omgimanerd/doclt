/**
 * @fileoverview Module handling the SSH key delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <key id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete an SSH key'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var keyid = argv.keyid;
  client.account.deleteSshKey(argv.keyid, function(error) {
    Util.handleError(error);
    Display.displayMessage('SSH Key {0} deleted.', keyid);
  });
};
