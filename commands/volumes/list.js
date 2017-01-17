/**
 * @fileoverview Module handling the volume listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all volumes'.yellow;

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.volumes.list((error, volumes) => {
    util.handleError(error);
    var table = new Table();
    volumes.map((volume) => {
      table.push([{
        colSpan: 2,
        content: 'ID: '.red + volume.id.toString().bold.cyan
      }]);
      table.push.apply(table, [
        ['Name', volume.name.blue],
        ['Size', volume.size_gigabytes + ' GB'],
        ['Region', volume.region.slug],
        ['Attached to', util.defaultJoin(volume.droplet_ids).bold.cyan]
      ].map((row) => [row[0].red, row[1]]));
    });
    console.log(table.toString());
  });
};
