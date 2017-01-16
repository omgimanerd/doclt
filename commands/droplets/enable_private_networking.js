/**
 * @fileoverview Module handling private networking enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'enable_private_networking <droplet id>';

exports.aliases = ['enable_pn'];

exports.description = 'Enable private networking on a droplet.'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.droplets.enablePrivateNetworking(argv.dropletid, (error) => {
    util.handleError(error);
    console.log('Private networking enabled.'.red);
  });
};
