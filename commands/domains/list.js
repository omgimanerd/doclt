/**
 * @fileoverview Module handling the domain name listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all domain names'.yellow;

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

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
