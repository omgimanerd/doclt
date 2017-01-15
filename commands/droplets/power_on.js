/**
 * @fileoverview Module handling the droplet power on command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'power_on <droplet id>';

exports.aliases = ['poweron', 'on'];

exports.description = 'Power on a droplet'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.droplets.powerOn(argv.dropletid, (error, action) => {
    util.handleError(error);
    console.log('Powering on droplet.'.red);
    console.log('Action ID: '.red + action.id.toString().bold.cyan);
  });
};
