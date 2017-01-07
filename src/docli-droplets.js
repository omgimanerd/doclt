/**
 * @fileoverview Commands for managing droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var commander = require('commander');
var Table = require('cli-table');
var digitalocean = require('digitalocean');

var token = require('./token');
var client = digitalocean.client(token.get());

var util = require('./util');

commander.usage('<command> [<arguments>] [<options>]');

commander.command('list')
  .description('lists all droplets')
  .action(function() {
    client.droplets.list(function(error, droplets) {
      if (error) {
        console.log(error.message.red);
        console.log('An error occurred! Try again later!'.red);
        process.exit(1);
      }
      var table = new Table({
        head: ['ID', 'Name', 'IPv4', 'Status']
      });
      for (var droplet of droplets) {
        var status = util.parseStatus(droplet.status);
        var networks = droplet.networks.v4.map(
            (network) => network.ip_address).join('\n');
        table.push([
          droplet.id, droplet.name, networks, status,
        ])
      };
      console.log(table.toString());
    });
  });

commander.command('info <id>')
  .description('fetches information about a droplet')
  .action(function(id, options) {
    client.droplets.get(id, function(error, droplet) {
      if (error) {
        console.log(error.message.red);
        console.log('An error occurred! Try again later!'.red);
        process.exit(1);
      }
      var table = new Table({
        head: [droplet.name, util.parseStatus(droplet.status)]
      });
      table.push({ 'ID': droplet.id });
      table.push({ 'Memory': droplet.memory + ' MB' });
      table.push({ 'Disk Size': droplet.disk + ' GB'});
      table.push({ 'VCPUs': droplet.vcpus });
      table.push({ 'Distribution':
          droplet.image.distribution + ' ' + droplet.image.name });
      table.push({ 'IPv4': util.defaultJoin(
          droplet.networks.v4.map((network) => network.ip_address)) });
      table.push({ 'IPv6': util.defaultJoin(
          droplet.networks.v6.map((network) => network.ip_address)) });
      table.push({ 'Tags': util.defaultJoin(droplet.tags) });
      table.push({ 'Created': new Date(droplet.created_at).toLocaleString() });
      console.log(table.toString());
    });
  })

commander.command('*')
  .description('**********************')
  .action(function(param) {
    if (!['list', 'info', 'create'].includes(param)) {
      commander.help();
    }
  });

commander.parse(process.argv);

if (!commander.args.length) commander.help();
