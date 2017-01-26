/**
 * @fileoverview Module handling the domain record listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'list <domain>';

exports.aliases = ['ls'];

exports.description = 'List all records for a domain'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.domains.listRecords(argv.domain, (error, records) => {
    Util.handleError(error);
    Display.displayDomainRecords(records);
  });
};
