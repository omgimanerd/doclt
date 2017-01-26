/**
 * @fileoverview Module handling the domain name delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <domain>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a domain name'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.domains.delete(argv.domain, (error) => {
    Util.handleError(error);
    Display.displayMessage('Domain name deleted.');
  });
};
