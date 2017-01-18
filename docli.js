#!/usr/bin/env node

// Importing colors here will allow us to use it everywhere else since it
// extends String.prototype.
var colors = require('colors');
var yargs = require('yargs');

var util = require('./lib/util');

yargs.commandDir('commands');
util.globalConfig(yargs, '\b', true);
yargs.argv;
