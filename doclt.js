#!/usr/bin/env node
/**
 * @fileoverview Main executable file for the doclt CLI.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const yargs = require('yargs')

const Util = require('./lib/Util')

yargs.commandDir('commands').fail(Util.handleFail)
Util.globalConfig(yargs, 0, '', true)

const argv = yargs.argv
if (argv !== null && argv.color) {
  console.log('Invoking --color does nothing!'.bold.red.bgWhite)
}
