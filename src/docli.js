#!/usr/bin/env node

var program = require('commander');

program.usage('<command> [<arguments>] [<options>]');

program.version('1.0.0')
  .command('droplets <action> [<arguments>] [<options>]',
           'perform actions on droplets');

program.command('token')
  .description('set an auth token')
  .action(function() {
    var token = require('./token');
    token.set();
  });

program.command('*')
  .description('**********************')
  .action(function(param) {
    if (!['droplets', 'token'].includes(param)) {
      program.help();
    }
  });

program.parse(process.argv);

if (!program.args.length) program.help();
