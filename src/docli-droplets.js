/**
 * @fileoverview Commands for managing droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Table = require('cli-table2');
var colors = require('colors');
var commander = require('commander');
var digitalocean = require('digitalocean');

var token = require('./token');
var client = digitalocean.client(token.get());

var util = require('./util');

commander.version(require('../package.json').version)
  .usage('<command> [<arguments>] [<options>]');

commander.command('list')
  .description('lists all droplets')
  .action(function() {
    client.droplets.list(function(error, droplets) {
      util.handleError(error);
      var table = new Table({
        head: ['ID', 'Name', 'IPv4', 'Status']
      });
      table.push.apply(table, droplets.map((droplet) => {
        var id = droplet.id.toString().bold.cyan;
        var status = util.parseStatus(droplet.status);
        var networks = droplet.networks.v4.map(
            (network) => network.ip_address).join('\n');
        return [ id, droplet.name.blue, networks, status ];
      }))
      console.log(table.toString());
    });
  });

commander.command('info')
  .description('fetches information about a droplet')
  .usage('<id> [options]')
  .option('--all, -a', 'list all information about this droplet')
  .option('--backups', 'list backups of this droplet')
  .option('--snapshots', 'list snapshots of this droplet')
  .option('--volumes', 'list volumes attached to this droplet')
  .action(function(id) {
    var context = this;
    util.ensureArgument(id, () => {
      context.help();
    });
    client.droplets.get(id, function(error, droplet) {
      util.handleError(error);
      var table = new Table({
        head: [droplet.name.blue, util.parseStatus(droplet.status)]
      });
      var kernel = droplet.kernel ? droplet.kernel.name.blue : 'none';
      table.push.apply(table, [
        [ 'ID', droplet.id.toString().bold.cyan ],
        [ 'Memory', droplet.memory + ' MB' ],
        [ 'Disk Size', droplet.disk + ' GB'],
        [ 'VCPUs', droplet.vcpus ],
        [ 'Kernel', kernel ],
        [ 'Image', droplet.image.distribution + ' ' + droplet.image.name ],
        [ 'Region', droplet.region.name ],
        [ 'IPv4', util.defaultJoin(
            droplet.networks.v4.map((network) => network.ip_address)) ],
        [ 'IPv6', util.defaultJoin(
            droplet.networks.v6.map((network) => network.ip_address)) ],
        [ 'Tags', util.defaultJoin(droplet.tags) ],
        [ 'Created', new Date(droplet.created_at).toLocaleString() ]
      ].map((row) => [row[0].red, row[1]] ));
      console.log(table.toString());
    });
  });

commander.command('create <name>')
  .description('creates a new droplet')
  .action(function(name, options) {
  });

/**
 * This clause catches any commands that are not part of the docli CLI, such as:
 *   docli droplets asdf
 *   docli droplets basdf
 * and outputs the standard help message.
 */
commander.command('*')
  .description('**********************')
  .action(function(param) {
    if (!commander.commands.map((command) => command._name).includes(param)) {
      commander.help();
    }
  });

commander.parse(process.argv);

/**
 * This catches the case where no subcommand was specified:
 *   docli droplets
 * and outputs the standard help message.
 */
if (!commander.args.length) commander.help();
