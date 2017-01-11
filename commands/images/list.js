/**
 * @fileoverview Module handling the image listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all images';

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.images.list(1, 9999, (error, images) => {
    util.handleError(error);
    var table = new Table({
      head: ['ID', 'Distribution', 'Min Size'],
      colWidths: [null, 56, null]
    });
    images.sort((a, b) => {
      a = a.distribution + a.name;
      b = b.distribution + b.name;
      return a.localeCompare(b);
    });
    table.push.apply(table, images.map((image) => {
      var distro = image.distribution + ' ' + image.name;
      return [image.id.toString().bold.cyan, distro, image.min_disk_size];
    }));
    console.log(table.toString());
  });
};
