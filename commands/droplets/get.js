/**
 * @fileoverview Module handling the droplet getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

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
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.get(argv.dropletid, (error, droplet) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(droplet);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      table.push.apply(table, [
        ['ID', Util.colorID(droplet.id)],
        ['Name', droplet.name.blue],
        ['Status', Util.colorDropletStatus(droplet.status)],
        ['Memory', droplet.memory + ' MB'],
        ['Disk Size', droplet.disk + ' GB'],
        ['VCPUs', droplet.vcpus],
        ['Kernel', droplet.kernel ? droplet.kernel.name.blue : 'none'],
        ['Image', droplet.image.distribution + ' ' + droplet.image.name],
        ['Features', Util.defaultJoin(droplet.features)],
        ['Region', droplet.region.name],
        ['IPv4', Util.defaultJoin(
            droplet.networks.v4.map((network) => network.ip_address))],
        ['IPv6', Util.defaultJoin(
            droplet.networks.v6.map((network) => network.ip_address))],
        ['Tags', Util.defaultJoin(droplet.tags)],
        ['Created At', new Date(droplet.created_at).toLocaleString()]
      ].map((row) => [row[0].red, row[1]]));
      if (argv.all || argv.backups) {
        table.push([{
          colSpan: 2,
          content: 'Backups\n'.red + Util.defaultJoin(droplet.backup_ids)
        }]);
      }
      if (argv.all || argv.snapshots) {
        table.push([{
          colSpan: 2,
          content: 'Snapshots\n'.red + Util.defaultJoin(droplet.snapshot_ids)
        }]);
      }
      if (argv.all || argv.volumes) {
        table.push([{
          colSpan: 2,
          content: 'Volumes\n'.red + Util.defaultJoin(droplet.volume_ids)
        }]);
      }
      if (table.length) {
        console.log(table.toString());
      }
    }
  });
};
