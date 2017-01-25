/**
 * @fileoverview Module handling the droplet listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all droplets'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.list((error, droplets) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(droplets);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['Droplet ID', 'Droplet Name', 'IPv4', 'Status']
      });
      table.push.apply(table, droplets.map((droplet) => {
        var id = Util.colorID(droplet.id);
        var status = Util.colorDropletStatus(droplet.status);
        var networks = droplet.networks.v4.map(
          (network) => network.ip_address).join('\n');
          return [id, droplet.name.blue, networks, status];
      }));
      console.log(table.toString());
    }
  });
};
