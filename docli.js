#!/usr/bin/env node

// Importing colors here will allow us to use it everywhere else since it
// extends String.prototype.
var colors = require('colors');
var yargs = require('yargs');

yargs.commandDir('commands')
  .demandCommand(1)
  .epilogue('See \'docli help <command\' for more info.')
  .recommendCommands()
  .version(() => require('./package.json').version)
  .wrap(72)
  .argv;
