/**
 * @fileoverview Module handling the IPv6 enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'enable_ipv6 <droplet id>';

exports.aliases = ['ipv6'];

exports.description = 'Enable IPv6 on a droplet.'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.droplets.enableIpv6(argv.dropletid, (error) => {
    util.handleError(error);
    console.log('IPv6 enabled.'.red);
  });
};
