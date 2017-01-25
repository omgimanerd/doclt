/**
 * @fileoverview Module handling the volume getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'get <volume id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a volume'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.volumes.get(argv.volumeid, (error, volume) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(volume);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      table.push([{
        colSpan: 2,
        content: 'ID: '.red + Util.colorID(volume.id)
      }]);
      table.push.apply(table, [
        ['Name', volume.name.blue],
        ['Size', volume.size_gigabytes + ' GB'],
        ['Region', volume.region.slug],
        ['Attached to', Util.defaultJoin(volume.droplet_ids).bold.cyan],
        ['Description', volume.description || 'none'],
        ['Created At', new Date(volume.created_at).toLocaleString()]
      ].map((row) => [row[0].red, row[1]]));
      console.log(table.toString());
    }
  });
};
