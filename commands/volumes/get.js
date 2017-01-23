/**
 * @fileoverview Module handling the volume getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'get <volume id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a volume'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.volumes.get(argv.volumeid, (error, volume) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(volume);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      table.push([{
        colSpan: 2,
        content: 'ID: '.red + util.colorID(volume.id)
      }]);
      table.push.apply(table, [
        ['Name', volume.name.blue],
        ['Size', volume.size_gigabytes + ' GB'],
        ['Region', volume.region.slug],
        ['Attached to', util.defaultJoin(volume.droplet_ids).bold.cyan],
        ['Description', volume.description || 'none'],
        ['Created at', new Date(volume.created_at).toLocaleString()]
      ].map((row) => [row[0].red, row[1]]));
      console.log(table.toString());
    }
  });
};
