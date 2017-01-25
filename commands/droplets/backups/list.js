/**
 * @fileoverview Module handling the droplet backup listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../../lib/Util');

exports.command = 'list <droplet id>';

exports.aliases = ['ls'];

exports.description = 'List all backups of a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.backups(argv.dropletid, (error, backups) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(backups);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['ID', 'Name', 'Created At']
      });
      table.push.apply(table, backups.map((backup) => {
        return [
          Util.colorID(backup.id),
          backup.name.blue,
          new Date(backup.created_at).toLocaleString()
        ];
      }));
      console.log(table.toString());
    }
  });
};
