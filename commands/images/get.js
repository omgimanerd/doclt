/**
 * @fileoverview Module handling the image getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'get <image id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about an image'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.images.get(argv.imageid, (error, image) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(image);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      table.push.apply(table, [
        ['ID', Util.colorID(image.id)],
        ['Name', image.name.blue],
        ['Distribution', image.distribution],
        ['Type', image.type],
        ['Slug', image.slug || 'none'],
        ['Public', image.public ? 'yes'.green : 'no'.red],
        ['Regions', Util.defaultJoin(image.regions)],
        ['Created At', new Date(image.created_at).toLocaleString()],
        ['Size', image.size_gigabytes + ' GB'],
        ['Minimum Disk Size', image.min_disk_size + ' GB']
      ].map((row) => [row[0].red, row[1]]));
      console.log(table.toString());
    }
  });
};
