/**
 * @fileoverview Module handling the droplet delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'delete <droplet id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a droplet'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.droplets.delete(argv.dropletid, (error) => {
    util.handleError(error);
    console.log('Droplet deleted.'.red);
  });
};
