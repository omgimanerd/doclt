/**
 * @fileoverview Module handling the snapshot listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List snapshots on your account'.yellow;

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.snapshots.list((error, snapshots) => {
    util.handleError(error);
    var table = new Table({ head: ['ID', 'Name', 'Min Size'] });
    snapshots.sort((a, b) => a.name.localeCompare(b.name));
    table.push.apply(table, snapshots.map((snapshot) => {
      return [
        snapshot.id.toString().bold.cyan,
        snapshot.name.blue,
        snapshot.min_disk_size + ' GB'
      ];
    }));
    console.log(table.toString());
  });
};
