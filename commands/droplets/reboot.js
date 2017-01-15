/**
 * @fileoverview Module handling the droplet reboot command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'reboot <droplet id>';

exports.aliases = ['restart'];

exports.description = 'Gracefully reboot a droplet'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.droplets.reboot(argv.dropletid, (error, action) => {
    util.handleError(error);
    console.log('Rebooting droplet.'.red);
    console.log('Action ID: '.red + action.id.toString().bold.cyan);
  });
};
