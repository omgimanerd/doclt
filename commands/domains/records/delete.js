/**
 * @fileoverview Module handling the domain record delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'delete <domain> <record id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a record'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../../lib/token');
  var util = require('../../../lib/util');
  var client = digitalocean.client(token.get());

  client.domains.deleteRecord(argv.domain, argv.recordid, (error) => {
    util.handleError(error);
    console.log('Domain record deleted.'.red);
  });
};
