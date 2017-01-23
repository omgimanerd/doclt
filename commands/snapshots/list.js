/**
 * @fileoverview Module handling the snapshot listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List snapshots on your account'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.snapshots.list((error, snapshots) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(snapshots);
    } else {
      var Table = require('cli-table2');
      var table = new Table({ head: ['ID', 'Name', 'Min Size'] });
      snapshots.sort((a, b) => a.name.localeCompare(b.name));
      table.push.apply(table, snapshots.map((snapshot) => {
        return [
          util.colorID(snapshot.id),
          snapshot.name.blue,
          snapshot.min_disk_size + ' GB'
        ];
      }));
      console.log(table.toString());
    }
  });
};
