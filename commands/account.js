/**
 * @fileoverview Module handling the account detail command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../lib/Display');
var Util = require('../lib/Util');

exports.command = 'account';

exports.aliases = ['acc'];

exports.description = 'Display account information'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 1, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.account.get(function(error, account) {
    Util.handleError(error);
    Display.displayAccount(account);
  });
};
