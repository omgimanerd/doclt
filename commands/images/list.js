/**
 * @fileoverview Module handling the image listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List images on your account'.yellow;

exports.builder = (yargs) => {
  yargs.option('type', {
    choices: ['application', 'distribution', 'private'],
    description: 'The type of images to fetch'
  });
};

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  var query = {};
  if (argv.type === 'private') {
    query.private = true;
  } else if (['application', 'distribution'].includes(argv.type)) {
    query.type = argv.type;
  } else {
    query.page = 1;
    query.per_page = Number.MAX_SAFE_INTEGER;
  }
  client.images.list(query, (error, images) => {
    util.handleError(error);
    var table = new Table({
      head: [
        'ID',
        'Distribution (' + 'PUBLIC'.green + ') (' + 'PRIVATE'.blue + ')',
        'Min Size'
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
        image.id.toString().bold.cyan,
        image.public ? distro.green : distro.blue,
        image.min_disk_size
      ];
    }));
    console.log(table.toString());
  });
};
