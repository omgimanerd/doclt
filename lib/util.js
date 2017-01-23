/**
 * @fileoverview Miscellaneous utility functions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');
var digitalocean = require('digitalocean');

/**
 * This takes an account status and colors it for output.
 * @param {string} status The account status to color
 * @return {string}
 */
exports.colorAccountStatus = (status) => {
  status = status.toString();
  switch (status) {
    case 'active':
      return status.green;
    case 'warning':
      return status.yellow;
    case 'locked':
      return status.red;
  }
  return status;
};

/**
 * This takes a droplet action status and colors it for output.
 * @param {string} status The action status to color
 * @return {string}
 */
exports.colorActionStatus = (status) => {
  status = status.toString();
  switch (status) {
    case 'completed':
      return status.green;
    case 'in-progress':
      return status.blue;
    case 'errored':
      return status.red;
  }
  return status;
};

/**
 * This takes a domain type and colors it for output.
 * @param {string} type The domain type to color
 * @return {string}
 */
exports.colorDomainType = (type) => {
  type = type.toString();
  switch (type) {
    case 'A':
      return type.yellow;
    case 'AAAA':
      return type.blue;
    case 'CNAME':
      return type.green;
    case 'MX':
      return type.cyan;
    case 'TXT':
      return type.magenta;
    case 'SRV':
      return type.red;
    case 'NS':
      return type.gray;
  }
  return type;
};

/**
 * This takes a droplet status and colors it for output.
 * @param {string} status The droplet status to color
 * @return {string}
 */
exports.colorDropletStatus = (status) => {
  status = status.toString();
  switch (status) {
    case 'new':
    case 'off':
      return status.red;
    case 'active':
      return status.green;
    case 'archived':
      return status.blue;
  }
  return status;
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
 * This function joins a list of values by newlines for display in cli-table2.
 * If the resulting string is empty, then it returns the string none.
 * @param {Array.<Object>} dataList A list of objects to display
 * @return {string}
 */
exports.defaultJoin = (dataList) => {
  return dataList.join('\n').trim() || 'none';
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
    .usage('Usage:\n  $0 ' + command + ' [options..]')
    .version()
    .wrap(yargs.terminalWidth());
};

/**
 * If an error occurred in the process of accessing the DigitalOcean API, we
 * will output it in red to the console and then exit.
 * @param {?Error=} error The error to display
 * @param {?boolean=} json Whether or not to display the error as JSON.
 */
exports.handleError = (error, json) => {
  if (error) {
    if (json) {
      console.log(JSON.stringify(error));
    } else {
      console.log(error.message.red);
    }
    process.exit(1);
  }
};
