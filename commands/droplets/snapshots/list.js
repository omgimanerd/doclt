/**
 * @fileoverview Module handling the snapshot listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../../lib/util');

exports.command = 'list <droplet id>';

exports.aliases = ['ls'];

exports.description = 'List snapshots made of a droplet'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.snapshots(argv.dropletid, (error, snapshots) => {
    util.handleError(error);
    if (argv.json) {
      console.log(snapshots);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['ID', 'Name', 'Created at']
      });
      table.push.apply(table, snapshots.map((snapshot) => {
        return [
          util.colorID(snapshot.id),
          snapshot.name.blue,
          new Date(snapshot.created_at).toLocaleString()
        ];
      }));
      console.log(table.toString());
    }
  });
};
