/**
 *
 */

var program = require('commander');
var Table = require('cli-table');
var digitalocean = require('digitalocean');

var token = require('./token');
var client = digitalocean.client(token.get());

program.usage('<command> [<arguments>] [<options>]');

program.command('list')
  .description('lists all droplets')
  .action(function() {
    client.droplets.list(function(error, droplets, metadata) {
      var fields = ['id', 'name', 'memory', 'status'];
      var table = new Table({ head: fields });
      for (var droplet of droplets) {
        table.push(fields.map((field) => droplet[field]));
      };
      console.log(table.toString());
    });
  });

program.command('info <id>')
  .description('fetches information about a droplet')
  .action(function(id) {
    var fields = ['id', 'name', 'status', 'created_at'];
    console.log(arguments);
    var table = new Table({ head: ["", "Top Header 1", "Top Header 2"] });
    table.push(
        { 'Left Header 1': ['Value Row 1 Col 1', 'Value Row 1 Col 2'] }
      , { 'Left Header 2': ['Value Row 2 Col 1', 'Value Row 2 Col 2'] }
    );

    console.log(table.toString());
  })

program.command('create <name>')
  .description('creates a new droplet')
  .action(function(name) {
    console.log(name + ' created');
  });

program.command('*')
  .description('**********************')
  .action(function(param) {
    if (!['list', 'info', 'create'].includes(param)) {
      program.help();
    }
  });

program.parse(process.argv);

if (!program.args.length) program.help();
