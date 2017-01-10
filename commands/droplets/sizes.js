/**
 * @fileoverview Module handling the listing of possible droplet sizes.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'sizes';

exports.description = 'Lists the possible droplet sizes'.yellow;

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.sizes.list((error, sizes) => {
    util.handleError(error);
    var table = new Table({
      head: ['ID', 'Memory', 'VCPUs', 'Disk Space', 'Transfer\nBandwidth',
        'Price/Month']
    });
    table.push.apply(table, sizes.map((size) => {
      return [
        size.slug.bold.cyan,
        size.memory + ' MB',
        size.vcpus,
        size.disk + ' GB',
        size.transfer + ' TB',
        '$' + size.price_monthly
      ];
    }));
    console.log(table.toString());
  });
};
