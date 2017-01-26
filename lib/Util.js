/**
 * @fileoverview Miscellaneous utility functions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');
var digitalocean = require('digitalocean');

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
 * This takes a yargs object and applies some global configuration for the
 * subcommand help display.
 * @param {Object} yargs The yargs object to apply configuration to
 * @param {string} command The command for usage string formatting
 * @param {?boolean=} demandCommand Whether or not this needs a subcommand
 *   If omitted, then no action is taken.
 */
exports.globalConfig = (yargs, command, demandCommand) => {
  if (demandCommand) {
    yargs.demandCommand(1, '');
    command = command + ' <command> [arguments..]'
  }
  // var usageString = 'Usage:\n  $0 ' + process.argv.slice(2, )
  yargs.epilogue('See \'$0 <command> --help\' for more info.')
    .help()
    .option('json', {
      description: 'Output results as JSON',
      boolean: true
    })
    .option('no-color', {
      description: 'Disable colors',
      boolean: true
    })
    .option('color', {
      description: 'Invoking this does nothing'
    })
    .recommendCommands()
    .strict()
    // TODO: This is borked for subcommands!
    .usage('Usage:\n  $0 ' + command + ' [options..]')
    .version()
    .wrap(yargs.terminalWidth());
};

/**
 * If an error occurred in the process of accessing the DigitalOcean API, we
 * will output it in red to the console and then exit.
 * @param {?Error=} error The error to display
 */
exports.handleError = (error) => {
  if (error) {
    if (exports.json()) {
      console.log(JSON.stringify(error));
    } else {
      console.log(error.message.red);
    }
    process.exit(1);
  }
};
