/**
 * @fileoverview Module handling the droplet getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'get <droplet id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a droplet'.yellow;

exports.builder = (yargs) => {
  yargs.option('all', {
    description: 'Show all Info'
  }).option('backups', {
    description: 'Show IDs of backups'
  }).option('snapshots', {
    description: 'Show IDs of snapshots'
  }).option('volumes', {
    description: 'Show IDs of attached volumes'
  });
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var client = util.getClient();

  client.droplets.get(argv.dropletid, (error, droplet) => {
    util.handleError(error);
    var table = new Table();
    table.push.apply(table, [
      ['ID', droplet.id.toString().bold.cyan],
      ['Name', droplet.name.blue],
      ['Status', util.colorDropletStatus(droplet.status)],
      ['Memory', droplet.memory + ' MB'],
      ['Disk Size', droplet.disk + ' GB'],
      ['VCPUs', droplet.vcpus],
      ['Kernel', droplet.kernel ? droplet.kernel.name.blue : 'none'],
      ['Image', droplet.image.distribution + ' ' + droplet.image.name],
      ['Features', util.defaultJoin(droplet.features)],
      ['Region', droplet.region.name],
      ['IPv4', util.defaultJoin(
          droplet.networks.v4.map((network) => network.ip_address))],
      ['IPv6', util.defaultJoin(
          droplet.networks.v6.map((network) => network.ip_address))],
      ['Tags', util.defaultJoin(droplet.tags)],
      ['Created at', new Date(droplet.created_at).toLocaleString()]
    ].map((row) => [row[0].red, row[1]]));
    if (argv.all || argv.backups) {
      table.push([{
        colSpan: 2,
        content: 'Backups\n'.red + util.defaultJoin(droplet.backup_ids)
      }]);
    }
    if (argv.all || argv.snapshots) {
      table.push([{
        colSpan: 2,
        content: 'Snapshots\n'.red + util.defaultJoin(droplet.snapshot_ids)
      }]);
    }
    if (argv.all || argv.volumes) {
      table.push([{
        colSpan: 2,
        content: 'Volumes\n'.red + util.defaultJoin(droplet.volume_ids)
      }]);
    }
    if (table.length) {
      console.log(table.toString());
    }
  });
};
