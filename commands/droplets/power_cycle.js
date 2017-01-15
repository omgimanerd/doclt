/**
 * @fileoverview Module handling the droplet power cycling command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'power_cycle <droplet id>';

exports.aliases = ['powercycle'];

exports.description = 'Power cycle a droplet (hard reset)'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.droplets.powerCycle(argv.dropletid, (error, action) => {
    util.handleError(error);
    console.log('Power cycling droplet.'.red);
    console.log('Action ID: '.red + action.id.toString().bold.cyan);
  });
};
