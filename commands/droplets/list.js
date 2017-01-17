/**
 * @fileoverview Module handling the droplet listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all droplets'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var client = util.getClient();

  client.droplets.list((error, droplets) => {
    util.handleError(error);
    var table = new Table({
      head: ['Droplet ID', 'Droplet Name', 'IPv4', 'Status']
    });
    table.push.apply(table, droplets.map((droplet) => {
      var id = droplet.id.toString().bold.cyan;
      var status = util.colorDropletStatus(droplet.status);
      var networks = droplet.networks.v4.map(
          (network) => network.ip_address).join('\n');
      return [id, droplet.name.blue, networks, status];
    }))
    console.log(table.toString());
  });
};
