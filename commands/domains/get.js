/**
 * @fileoverview Module handling the domain name getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'get <domain name>';

exports.aliases = ['i', 'info'];

exports.description = 'Information about a domain name'.yellow;

exports.builder = (yargs) => {
  yargs.option('zone', {
    description: 'Show only the zone file'
  });
};

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.domains.get(argv.domainname, (error, domain) => {
    util.handleError(error);
    if (argv.zone) {
      console.log(domain.zone_file);
    } else {
      console.log('Domain Name: '.red + domain.name);
      console.log('TTL: '.red + domain.ttl);
      console.log('Zone File:\n'.red + domain.zone_file);
    }
  });
};
