/**
 * @fileoverview Module handling the volume getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'get <volume id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a volume'.yellow;

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.volumes.get(argv.volumeid, (error, volume) => {
    util.handleError(error);
    var table = new Table();
    table.push([{
      colSpan: 2,
      content: 'ID: '.red + volume.id.toString().bold.cyan
    }]);
    table.push.apply(table, [
      ['Name', volume.name.blue],
      ['Size', volume.size_gigabytes + ' GB'],
      ['Region', volume.region.slug],
      ['Attached to', util.defaultJoin(volume.droplet_ids).bold.cyan],
      ['Description', volume.description || 'none'],
      ['Created at', new Date(volume.created_at).toLocaleString()]
    ].map((row) => [row[0].red, row[1]]));
    console.log(table.toString());
  });
};
