/**
 * @fileoverview Module handling the droplet power off command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'power_off <droplet id>';

exports.aliases = ['poweroff', 'off'];

exports.description = 'Power off a droplet (hard)'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.droplets.powerOff(argv.dropletid, (error, action) => {
    util.handleError(error);
    console.log('Powering off droplet.'.red);
    console.log('Action ID: '.red + action.id.toString().bold.cyan);
  });
};
