#!/usr/bin/env node
/**
 * @fileoverview Main executable file for the doclt CLI.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const yargs = require('yargs')

const util = require('./lib/util')

util.globalConfig(yargs, 0, 0, true)

// eslint-disable-next-line no-unused-expressions
yargs.completion('completion', 'Generate bash completion script'.yellow)
  .commandDir('commands').fail(util.handleFail).argv
