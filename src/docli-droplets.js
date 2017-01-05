// var digitalocean = require('digitalocean')

var program = require('commander');

// program.usage('<command> [<arguments>] [<options>]');

program.command('list')
  .description('lists all droplets')
  .action(function() {
    console.log('listed');
  });

program.command('create <name>')
  .action(function(name) {
    console.log(name + ' created');
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
