#!/usr/bin/env node

var commander = require('commander');

commander.version(require('../package.json').version)
  .usage('<command> [<arguments>] [<options>]');

commander.command('droplets', 'perform actions on droplets');

commander.command('token')
  .description('set an auth token')
  .action(function() {
    var token = require('./token');
    token.set();
  });

/**
 * This clause catches any commands that are not part of the docli CLI, such as:
 *   docli asdf
 *   docli create
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
 *   docli
 * and outputs the standard help message.
 */
if (!commander.args.length) commander.help();
