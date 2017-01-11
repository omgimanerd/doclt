/**
 * @fileoverview Module handling the domain record listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'list <domain>';

exports.aliases = ['ls'];

exports.description = 'List all records for a domain'.yellow;

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../../lib/token');
  var util = require('../../../lib/util');
  var client = digitalocean.client(token.get());

  client.domains.listRecords(argv.domain, (error, records) => {
    util.handleError(error);
    var table = new Table({
      head: ['ID', 'Type', 'Name', 'Data']
    });
    table.push.apply(table, records.map((record) => {
      var type = util.parseDomainType(record.type);
      return [record.id.toString().bold.cyan, type, record.name, record.data];
    }));
    console.log(table.toString());
  });
};
