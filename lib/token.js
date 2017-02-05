/**
 * @fileoverview This module manages the getting and setting of a DigitalOcean
 *   auth token.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');
var fs = require('fs');
var path = require('path');

var tokenFile = path.join(__dirname, '.doclt_token');

/**
 * This function fetches and returns the DigitalOcean access token, if it was
 * supplied or set in an environment variable.
 * @return {string}
 */
exports.get = () => {
  if (process.env.doclt_TOKEN) {
    return process.env.doclt_TOKEN;
  }
  try {
    return fs.readFileSync(tokenFile, 'utf-8');
  } catch (error) {
    console.error('DigitalOcean access token not available!'.red);
    console.error('Run "doclt token" to set your access token or set a ' +
        'doclt_TOKEN environment variable'.red);
    process.exit(1);
  }
}

/**
 * This function sets the DigitalOcean access token.
 * @param {string} token The DigitalOcean access token
 * @param {function()} callback The callback function
 */
exports.set = (token, callback) => {
  fs.writeFile(tokenFile, token, (error) => {
    if (error) {
      return callback(error);
    }
    fs.chmod(tokenFile, '600', (error) => {
      if (error) {
        return callback(error);
      }
      callback(null);
    });
  });
}
