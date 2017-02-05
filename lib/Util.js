/**
 * @fileoverview Miscellaneous utility functions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');
var digitalocean = require('digitalocean');
var os = require('os');

/**
 * @private
 * Generates the usage string for a command.
 * @param {number} depth The command depth in the commands directory
 * @param {string} command The command itself, including any arguments
 * @param {?boolean=} demandSubcommand Whether or not this command requires
 *   a subcommand
 * @return {string}
 */
var getUsageString = (depth, command, demandSubcommand) => {
  var usage = ['Usage:\n', '', '$0'];
  if (depth > 1) {
    /**
     * We slice the command line arguments from the second element to the
     * element at the depth index to add the subcommand sequence to the
     * usage string.
     * Example: docli domains records add --help
     * process.argv.slice(2, 1 + depth) splices "domains records" into the
     * usage string.
     */
    usage.push.apply(usage, process.argv.slice(2, 1 + depth));
  }
  if (depth > 0) {
    usage.push(command);
  }
  /**
   * docli <command> is a depth 0 command.
   */
  if (demandSubcommand) {
    usage.push('<command>', '[arguments..]');
  }
  usage.push('[options..]');
  return usage.join(' ');
};

/**
 * Turns a string of comma separated values into an array of values.
 * @param {string} string A string of comma separated values
 * @return {Array.<string>}
 */
exports.csvToArray = (string) => {
  return string ? string.split(',').map((v) => v.trim()) : '';
};

/**
 * Returns an instance of an authenticated DigitalOcean client.
 * @return {Object}
 */
exports.getClient = () => {
  var token = require('./token');
  return digitalocean.client(token.get());
};

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
exports.globalConfig = (yargs, depth, command, demandSubcommand) => {
  if (demandSubcommand) {
    yargs.demandCommand(1, '');
  }
  yargs.epilogue('See \'$0 <command> --help\' for more info.')
    .help('help', 'Show help'.yellow)
    .alias('help', ['h'])
    .option('dev', {
      alias: ['development'],
      description: 'Run in development mode'.yellow,
      boolean: true
    })
    .option('json', {
      alias: ['j'],
      description: 'Output results as JSON'.yellow,
      boolean: true
    })
    .option('no-color', {
      description: 'Disable colors'.yellow,
      boolean: true
    })
    .option('color', {
      description: 'Invoking this does nothing'.yellow,
      boolean: true
    })
    .recommendCommands()
    .strict()
    .usage(getUsageString(depth, command, demandSubcommand))
    .version('version', 'Show version number'.yellow)
    .alias('version', ['v'])
    .wrap(yargs.terminalWidth());
};

/**
 * If an error occurred in the process of accessing the DigitalOcean API, we
 * will output it in red to the console and then exit.
 * @param {?Error=} error The error to display
 */
exports.handleError = (error) => {
  if (error) {
    if (process.argv.includes('--json')) {
      console.log(JSON.stringify(error));
    } else {
      console.log(error.message.red);
    }
    process.exit(1);
  }
};

/**
 * If an error occurred in the CLI outside of the DigitalOcean API, we will
 * catch it with yargs.fail() and output a comprehensive error message to the
 * user so that they can file an issue for us.
 * @param {?string} message The error message
 * @param {?Error} error The error, if one was thrown
 * @param {Object} yargs The yargs object when the error was thrown
 */
exports.handleFail = (message, error, yargs) => {
  if (process.argv.includes('--dev')) {
    console.log(message);
    console.log(error);
  } else if (error) {
    console.error('An error occurred! Please open an issue at:'.red);
    console.error('https://github.com/omgimanerd/docli/issues'.green);
    console.error('Copy this error message into it:'.red);
    console.error('------------------------------------------');
    console.error(`Node Version: ${process.version}`);
    console.error(`Platform: ${process.platform} ${os.release()}`);
    console.error(`Processor Architecture: ${process.arch}`);
    console.error('------------------------------------------');
    console.error(error);
  } else {
    yargs.showHelp();
    if (message) {
      console.error(message);
    }
  }
  process.exit(1);
};
