#!/usr/bin/env node

// Importing colors here will allow us to use it everywhere else since it
// extends String.prototype.
var colors = require('colors');
var yargs = require('yargs');

yargs.commandDir('commands')
  .demandCommand(1)
  .epilogue('See \'docli <command> --help\' for more info.')
  .option('json', { description: 'Output results as JSON' })
  .option('no-color', { description: 'Disable colors' })
  .recommendCommands()
  .version(() => require('./package.json').version)
  .wrap(80)
  .argv;
