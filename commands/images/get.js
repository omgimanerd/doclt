/**
 * @fileoverview Module handling the image getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'get <image id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about an image'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var client = util.getClient();

  client.images.get(argv.imageid, (error, image) => {
    util.handleError(error);
    var table = new Table();
    table.push.apply(table, [
      ['ID', image.id.toString().bold.cyan],
      ['Name', image.name.blue],
      ['Distribution', image.distribution],
      ['Type', image.type],
      ['Slug', image.slug || 'none'],
      ['Public', image.public],
      ['Regions', util.defaultJoin(image.regions)],
      ['Created at', new Date(image.created_at).toLocaleString()],
      ['Size', image.size_gigabytes + ' GB'],
      ['Min Size', image.min_disk_size + ' GB']
    ].map((row) => [row[0].red, row[1]]));
    console.log(table.toString());
  });
};
