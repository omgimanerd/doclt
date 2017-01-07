#!/usr/bin/env node

var commander = require('commander');

commander.usage('<command> [<arguments>] [<options>]');

commander.version('1.0.0')
  .command('droplets <action> [<arguments>] [<options>]',
           'perform actions on droplets');

commander.command('token')
  .description('set an auth token')
  .action(function() {
    var token = require('./token');
    token.set();
  });

commander.command('*')
  .description('**********************')
  .action(function(param) {
    if (!['droplets', 'token'].includes(param)) {
      commander.help();
    }
  });

commander.parse(process.argv);

if (!commander.args.length) commander.help();
