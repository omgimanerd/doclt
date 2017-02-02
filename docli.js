#!/usr/bin/env node
/**
 * @fileoverview Main executable file for the docli CLI.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var yargs = require('yargs');

var Util = require('./lib/Util');

yargs.commandDir('commands').fail(Util.handleFail);
Util.globalConfig(yargs, 0, '', true);

var argv = yargs.argv;
if (argv !== null && argv.color) {
  console.log('Invoking --color does nothing you idiot!'.bold.red.bgWhite);
}
