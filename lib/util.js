/**
 * @fileoverview Miscellaneous utility functions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

// eslint-disable-next-line no-unused-vars
const colors = require('colors')
const digitalocean = require('digitalocean')
const os = require('os')

const config = require('./config')
const version = require('../package.json').version

/**
 * Given a command to complete and the current parsed arguments,
 * this function returns a list of possible command completions.
 * @param {string} command The current command to complete
 * @param {Object} argv The currently parsed arguments
 * @return {Array.<string>}
 */
const completionCallback = (command, argv) => {
  // TODO: properly determine bash completions
  console.log(command)
  return ['foo', 'bar']
}

/**
 * Turns a string of comma separated values into an array of values.
 * @param {string} string A string of comma separated values
 * @return {Array.<string>}
 */
const csvToArray = string => {
  return string ? string.split(',').map(v => v.trim()) : []
}

/**
 * Returns an instance of an authenticated DigitalOcean client.
 * @return {Object}
 */
const getClient = () => {
  return digitalocean.client(config.getToken())
}

/**
 * This takes a yargs object for a command and applies global configuration to
 * it.
 * @param {Object} yargs The yargs object to apply configuration to
 * @param {number} depth The depth of the command in the commands directory
 * @param {string} command The command for usage string formatting, including
 *   any arguments.
 * @param {?boolean=} demandSubcommand Whether or not this command needs to be
 *   configured to demand a subcommand.
 */
const globalConfig = (yargs, depth, command, demandSubcommand) => {
  if (demandSubcommand) {
    yargs.demandCommand(1, '')
  }
  yargs.epilogue('See \'$0 <command> --help\' for more info.')
    .help('help', 'Show help'.yellow)
    .option('dev', {
      description: 'Run in development mode'.yellow,
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
    .scriptName('doclt')
    .strict()
    .version('version', 'Show version number'.yellow, version)
    .wrap(yargs.terminalWidth())
}

/**
 * If an error occurred in the CLI outside of the DigitalOcean API, we will
 * catch it with yargs.fail() and output a comprehensive error message to the
 * user so that they can file an issue for us.
 * @param {?string} message The error message
 * @param {?Error} error The error, if one was thrown
 * @param {Object} yargs The yargs object when the error was thrown
 */
const handleFail = (message, error, yargs) => {
  if (process.argv.indexOf('--dev') !== -1) {
    console.log(message)
    console.log(error)
  } else if (error) {
    console.error('An error occurred! Please open an issue at:'.red)
    console.error('https://github.com/omgimanerd/doclt/issues'.green)
    console.error('Copy this error message into it:'.red)
    console.error('------------------------------------------')
    console.error(`Node Version: ${process.version}`)
    console.error(`Platform: ${process.platform} ${os.release()}`)
    console.error(`Processor Architecture: ${process.arch}`)
    console.error(error)
    console.error('------------------------------------------')
  } else {
    yargs.showHelp()
    if (message) {
      console.error(message)
    }
  }
  // eslint-disable-next-line no-process-exit
  process.exit(1)
}

/**
 * If an error occurred in the process of accessing the DigitalOcean API, we
 * will output it in red to the console and then exit.
 * @param {?Error=} error The error to display
 */
const handleError = error => {
  if (error) {
    if (process.argv.indexOf('--json') !== -1) {
      console.log(JSON.stringify(error))
    } else {
      console.log(error.message.red)
    }
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
}

module.exports = exports = {
  completionCallback,
  csvToArray,
  getClient,
  globalConfig,
  handleError,
  handleFail
}
