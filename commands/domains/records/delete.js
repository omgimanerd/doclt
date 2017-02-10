/**
 * @fileoverview Module handling the domain record delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'delete <domain> <record id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a record'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var domain = argv.domain;
  var recordid = argv.recordid;
  client.domains.deleteRecord(domain, recordid, function(error) {
    Util.handleError(error);
    Display.displayMessage(
        'Domain record {0} deleted from {1}.', recordid, domain);
  });
};
