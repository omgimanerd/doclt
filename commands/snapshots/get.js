/**
 * @fileoverview Module handling the snapshot getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'get <snapshot id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a snapshot'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.snapshots.get(argv.snapshotid, (error, snapshot) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(snapshot);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      table.push.apply(table, [
        ['ID', Util.colorID(snapshot.id)],
        ['Name', snapshot.name.blue],
        ['Size', snapshot.size_gigabytes + ' GB'],
        ['Minimum Size', snapshot.min_disk_size + 'GB'],
        ['Created At', new Date(snapshot.created_at).toLocaleString()],
        ['Resource ID', Util.colorID(snapshot.resource_id)],
        ['Resource Type', snapshot.resource_type],
        ['Regions', Util.defaultJoin(snapshot.regions)]
      ].map((row) => [row[0].red, row[1]]));
      console.log(table.toString());
    }
  });
};
