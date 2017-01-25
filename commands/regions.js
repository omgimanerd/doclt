/**
 * @fileoverview Module handling the listing of possible droplet regions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'regions';

exports.aliases = ['region'];

exports.description = 'Lists the available regions'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.regions.list((error, regions) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(regions);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['ID', 'Name', 'Sizes', 'Features', 'Available']
      });
      regions.sort((a, b) => {
        return a.slug.localeCompare(b.slug);
      });
      table.push.apply(table, regions.map((region) => {
        return [
          region.slug.bold.cyan,
          region.name.blue,
          Util.defaultJoin(region.sizes),
          Util.defaultJoin(region.features),
          region.available ? 'yes'.green : 'no'.red
        ];
      }));
      console.log(table.toString());
    }
  });
};
