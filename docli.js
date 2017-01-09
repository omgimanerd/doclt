#!/usr/bin/env node

var yargs = require('yargs');

yargs.commandDir('commands')
  .demandCommand(1)
  .help()
  .version(() => require('./package.json').version)
  .wrap(80)
  .argv;
