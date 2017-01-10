/**
 * @fileoverview Module handling the listing of possible droplet regions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'regions';

exports.aliases = ['region'];

exports.description = 'Lists the possible droplet regions'.yellow;

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.regions.list((error, regions) => {
    util.handleError(error);
    var table = new Table({
      head: ['ID', 'Name', 'Sizes', 'Features', 'Available']
    });
    table.push.apply(table, regions.map((region) => {
      return [
        region.slug.bold.cyan,
        region.name.blue,
        util.defaultJoin(region.sizes),
        util.defaultJoin(region.features),
        region.available ? 'yes'.green : 'no'.red
      ];
    }));
    console.log(table.toString());
  });
};
