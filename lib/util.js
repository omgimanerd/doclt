/**
 * @fileoverview Miscellaneous utility functions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');

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
 * If an error occurred in the process of accessing the DigitalOcean API, we
 * will output it in red to the console and then exit.
 * @param {?Error} error The error to display
 */
exports.handleError = (error) => {
  if (error) {
    console.log(error.message.red);
    process.exit(1);
  }
};

exports.parseDomainType = (type) => {
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
 * This takes a droplet status and colorizes it for output.
 * @param {string} status The droplet status to colorize.
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
