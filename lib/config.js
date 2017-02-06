/**
 * @fileoverview This module manages the command line tool settings.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');
var fs = require('fs');
var path = require('path');

var configFile = path.join(__dirname, '../config.json');

/**
 * This function fetches and returns the DigitalOcean access token, if it was
 * supplied or set in an environment variable.
 * @return {string}
 */
exports.getToken = () => {
  if (process.env.DOCLT_TOKEN) {
    return process.env.DOCLT_TOKEN;
  }
  try {
    return require('../config.json').token;
  } catch (error) {
    console.error('DigitalOcean access token not available!'.red);
    console.error('Run "doclt token" to set your access token or set a ' +
        'DOCLT_TOKEN environment variable'.red);
    process.exit(1);
  }
}

/**
 * This function sets the DigitalOcean access token.
 * @param {string} token The DigitalOcean access token
 * @param {function()} callback The callback function
 */
exports.setToken = (token, callback) => {
  var data = require('../config.json');
  data.token = token;
  fs.writeFile(configFile, data, (error) => {
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
};
