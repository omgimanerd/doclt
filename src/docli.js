#!/usr/bin/env node

var program = require('commander');

console.log('baserun');

program.version('1.0.0')
  .command('droplets <action> [<arguments>] [<options>]',
           'perform actions on droplets');

program.command('authenticate')
  .description('set an auth token')
  .action(function() {
    console.log('actionable');
  });

program.command('*')
  .action(function() {
    program.help();
  });

program.parse(process.argv);
