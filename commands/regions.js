/**
 * @fileoverview Module handling the listing of possible droplet regions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../lib/util');

exports.command = 'regions';

exports.aliases = ['region'];

exports.description = 'Lists the available regions'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var client = util.getClient();

  client.regions.list((error, regions) => {
    util.handleError(error);
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
        util.defaultJoin(region.sizes),
        util.defaultJoin(region.features),
        region.available ? 'yes'.green : 'no'.red
      ];
    }));
    console.log(table.toString());
  });
};
