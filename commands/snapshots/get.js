/**
 * @fileoverview Module handling the snapshot getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'get <snapshot id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a snapshot'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.snapshots.get(argv.snapshotid, (error, snapshot) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(snapshot);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      table.push.apply(table, [
        ['ID', util.colorID(snapshot.id)],
        ['Name', snapshot.name.blue],
        ['Size', snapshot.size_gigabytes + ' GB'],
        ['Minimum Size', snapshot.min_disk_size + 'GB'],
        ['Created At', new Date(snapshot.created_at).toLocaleString()],
        ['Resource ID', util.colorID(snapshot.resource_id)],
        ['Resource Type', snapshot.resource_type],
        ['Regions', util.defaultJoin(snapshot.regions)]
      ].map((row) => [row[0].red, row[1]]));
      console.log(table.toString());
    }
  });
};
