/**
 * @fileoverview Module handling the SSH key rename command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'rename <key id> <name>';

exports.aliases = ['update'];

exports.description = 'Rename an SSH key'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.account.updateSshKey(argv.keyid, {
    name: argv.name
  }, function(error, key) {
    Util.handleError(error);
    Display.displaySshKey(key, false, 'SSH Key renamed.');
  });
};
