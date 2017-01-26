#!/usr/bin/env node

// Importing colors here will allow us to use it everywhere else since it
// extends String.prototype.
var colors = require('colors');
var yargs = require('yargs');

var Util = require('./lib/Util');

yargs.commandDir('commands');
Util.globalConfig(yargs, 0, '\b', true);
var argv = yargs.argv;

if (argv.color) {
  console.log('Invoking --color does nothing you idiot!'.bold.red.bgWhite);
}
