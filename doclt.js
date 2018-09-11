#!/usr/bin/env node
/**
 * @fileoverview Main executable file for the doclt CLI.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const yargs = require('yargs')

const util = require('./lib/util')

const VERSION = require('./package.json').version

try {
  yargs.commandDir('commands')
    .completion('completion', 'Generate bash completion script'.yellow)
    .demandCommand()
    .help('help', 'Show help for a command'.yellow)
    .option('dev', {
      hidden: true,
      'boolean': true
    })
    .option('json', {
      description: 'Output results as JSON'.yellow,
      'boolean': true
    })
    .option('no-color', {
      description: 'Disable colors'.yellow,
      'boolean': true
    })
    .recommendCommands()
    .scriptName('doclt')
    .strict()
    .version('version', 'Show version number'.yellow, VERSION)
    .wrap(yargs.terminalWidth())
    .parse()
} catch (error) {
  util.handleFail(null, error)
}
