/**
 * @fileoverview Module handling the domain record getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'get <domain> <record id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a domain record'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.domains.getRecord(argv.domain, argv.recordid, (error, record) => {
    Util.handleError(error);
    Display.displayDomainRecord(record);
  });
};
