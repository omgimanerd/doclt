#!/usr/bin/env node

var yargs = require('yargs');

yargs.commandDir('commands')
  .demandCommand(1)
  .epilogue('See \'docli help <command\' for more information.')
  .help()
  .recommendCommands()
  .version(() => require('./package.json').version)
  .wrap(80)
  .argv;
