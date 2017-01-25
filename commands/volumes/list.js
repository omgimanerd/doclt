/**
 * @fileoverview Module handling the volume listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all volumes'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.volumes.list((error, volumes) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(volumes);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      volumes.map((volume) => {
        table.push([{
          colSpan: 2,
          content: 'ID: '.red + Util.colorID(volume.id)
        }]);
        table.push.apply(table, [
          ['Name', volume.name.blue],
          ['Size', volume.size_gigabytes + ' GB'],
          ['Region', volume.region.slug],
          ['Attached to', Util.defaultJoin(volume.droplet_ids).bold.cyan]
        ].map((row) => [row[0].red, row[1]]));
      });
      console.log(table.toString());
    }
  });
};
