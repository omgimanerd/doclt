/**
 * @fileoverview Module handling the snapshot listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../../lib/Util');

exports.command = 'list <droplet id>';

exports.aliases = ['ls'];

exports.description = 'List snapshots made of a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.snapshots(argv.dropletid, (error, snapshots) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(snapshots);
    } else {
      var Table = require('cli-table2');
      var table = new Table({ head: ['ID', 'Name', 'Created At'] });
      table.push.apply(table, snapshots.map((snapshot) => {
        return [
          Util.colorID(snapshot.id),
          snapshot.name.blue,
          new Date(snapshot.created_at).toLocaleString()
        ];
      }));
      console.log(table.toString());
    }
  });
};
