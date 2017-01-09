/**
 * @fileoverview Module handling the domain name add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'add <domain> <ip>';

exports.aliases = ['create'];

exports.description = 'Add a domain name'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.domains.create({
    name: argv.domain,
    ip_address: argv.ip
  }, (error) => {
    util.handleError(error);
    console.log('New domain name added.'.red);
  });
};
