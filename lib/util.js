/**
 * @fileoverview Miscellaneous utility functions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');

/**
 * This function joins a list of values by newlines for display in cli-table2.
 * If the resulting string is empty, then it returns the string none.
 * @param {Array.<Object>} dataList A list of objects to display
 * @return {string}
 */
module.exports.defaultJoin = (dataList) => {
  return dataList.join('\n').trim() || 'none';
};

/**
 * If an error occurred in the process of accessing the DigitalOcean API, we
 * will output it in red to the console and then exit.
 * @param {?Error} error The error to display
 */
module.exports.handleError = (error) => {
  if (error) {
    console.log(error.message.red);
    process.exit(1);
  }
};

/**
 * This takes a droplet status and colorizes it for output.
 * @param {string} status The droplet status to colorize.
 * @return {string}
 */
module.exports.parseStatus = (status) => {
  switch (status) {
    case 'new':
    case 'off':
      return status.red;
      break;
    case 'active':
      return status.green;
      break;
    case 'archived':
      return status.blue;
      break;
  }
};
