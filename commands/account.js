/**
 * @fileoverview Module handling the account detail command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../lib/Display');
var Util = require('../lib/Util');

exports.command = 'account';

exports.aliases = ['acc'];

exports.description = 'Display account information'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.account.get(Display.displayAccount);
};
