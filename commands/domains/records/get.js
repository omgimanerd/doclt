/**
 * @fileoverview Module handling the domain record getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'get <domain> <record id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a domain record'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../../lib/token');
  var util = require('../../../lib/util');
  var client = digitalocean.client(token.get());

  client.domains.getRecord(argv.domain, argv.recordid, (error, record) => {
    util.handleError(error);
    console.log('Domain Record ID: '.red + record.id);
    console.log('Domain Record Type: '.red + record.type);
    console.log('Domain Record Name: '.red + record.name);
    console.log('Domain Record Data: '.red + record.data);
    console.log('Domain Record Priority: '.red + record.priority);
    console.log('Domain Record Port: '.red + record.port);
    console.log('Domain Record Weight: '.red + record.weight);
  });
};
