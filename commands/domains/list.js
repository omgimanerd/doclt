/**
 * @fileoverview Module handling the domain name listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all domain names'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var client = util.getClient();

  client.domains.list((error, domains) => {
    util.handleError(error);
    var table = new Table({
      head: ['Domain Name', 'TTL']
    });
    table.push.apply(table, domains.map((domain) => {
      return [domain.name.blue, domain.ttl];
    }));
    console.log(table.toString());
  });
};
