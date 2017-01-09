/**
 * @fileoverview Module handling the domain name delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'delete <domain>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a domain name'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.domains.delete(argv.domain, (error) => {
    util.handleError(error);
    console.log('Domain name deleted.'.red);
  });
};
