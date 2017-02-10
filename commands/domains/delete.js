/**
 * @fileoverview Module handling the domain name delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <domain>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a domain name'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var domain = argv.domain;
  client.domains.delete(domain, function(error) {
    Util.handleError(error);
    Display.displayMessage('Domain name {0} deleted.', domain);
  });
};
