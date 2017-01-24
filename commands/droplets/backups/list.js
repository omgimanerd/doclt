/**
 * @fileoverview Module handling the droplet backup listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../../lib/util');

exports.command = 'list <droplet id>';

exports.aliases = ['ls'];

exports.description = 'List all backups of a droplet'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.backups(argv.dropletid, (error, backups) => {
    util.handleError(error);
    if (argv.json) {
      console.log(backups);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['ID', 'Name', 'Created at']
      });
      table.push.apply(table, backups.map((backup) => {
        return [
          util.colorID(backup.id),
          backup.name.blue,
          new Date(backup.created_at).toLocaleString()
        ];
      }));
      console.log(table.toString());
    }
  });
};
