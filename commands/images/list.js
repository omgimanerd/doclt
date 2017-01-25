/**
 * @fileoverview Module handling the image listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List images on your account'.yellow;

exports.builder = (yargs) => {
  yargs.option('application', {
    description: 'Fetch application based images'
  }).option('distribution', {
    description: 'Fetch distribution based images'
  }).option('private', {
    description: 'Fetch all private user images'
  });
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  var query = {};
  if (argv.private) {
    query.private = true;
  } else if (argv.application) {
    query.type = 'application';
  } else if (argv.distribution) {
    query.type = 'distribution';
  } else {
    query.page = 1;
    query.per_page = Number.MAX_SAFE_INTEGER;
  }
  client.images.list(query, (error, images) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(images);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: [
          'ID',
          'Name (' + 'PUBLIC'.green + ') (' + 'PRIVATE'.blue + ')',
          'Minimum Size'
        ]
      });
      images.sort((a, b) => {
        a = a.distribution + a.name;
        b = b.distribution + b.name;
        return a.localeCompare(b);
      });
      table.push.apply(table, images.map((image) => {
        var distro = image.distribution + ' ' + image.name;
        return [
          Util.colorID(image.id),
          image.public ? distro.green : distro.blue,
          image.min_disk_size + ' GB'
        ];
      }));
      console.log(table.toString());
    }
  });
};
