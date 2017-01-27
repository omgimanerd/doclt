/**
 * @fileoverview Module handling the domain record delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'delete <domain> <record id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a record'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.domains.deleteRecord(argv.domain, argv.recordid, (error) => {
    Util.handleError(error);
    Display.displayMessage('Domain record deleted');
  });
};
