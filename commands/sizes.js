/**
 * @fileoverview Module handling the listing of possible droplet sizes.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../lib/util');

exports.command = 'sizes';

exports.aliases = ['size'];

exports.description = 'Lists the available droplet sizes'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.sizes.list((error, sizes) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(sizes);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['ID', 'Memory', 'VCPUs', 'Disk Space', 'Transfer\nBandwidth',
        'Price/Month']
      });
      table.push.apply(table, sizes.map((size) => {
        return [
          size.slug.bold.cyan,
          size.memory + ' MB',
          size.vcpus,
          size.disk + ' GB',
          size.transfer + ' TB',
          '$' + size.price_monthly
        ];
      }));
      console.log(table.toString());
    }
  });
};
