/**
 * @fileoverview Module handling the domain name listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all domain names'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.domains.list((error, domains) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(domains);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['Domain Name', 'TTL']
      });
      table.push.apply(table, domains.map((domain) => {
        return [domain.name.blue, domain.ttl];
      }));
      console.log(table.toString());
    }
  });
};
