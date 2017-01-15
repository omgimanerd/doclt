/**
 * @fileoverview Module handling the droplet shutdown command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'shutdown <droplet id>';

exports.description = 'Gracefully shut down a droplet'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.droplets.shutdown(argv.dropletid, (error, action) => {
    util.handleError(error);
    console.log('Shutting down droplet.'.red);
    console.log('Action ID: '.red + action.id.toString().bold.cyan);
  });
};
