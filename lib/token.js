/**
 * @fileoverview This module manages the getting and setting of a DigitalOcean
 *   auth token.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');
var fs = require('fs');
var path = require('path');

var tokenFile = path.join(__dirname, '.docli_token');

/**
 * This function fetches and returns the DigitalOcean access token, if it was
 * supplied or set in an environment variable.
 * @return {string}
 */
exports.get = () => {
  if (process.env.DOCLI_TOKEN) {
    return process.env.DOCLI_TOKEN;
  }
  try {
    return fs.readFileSync(tokenFile, 'utf-8');
  } catch (error) {
    console.error('DigitalOcean access token not available!'.red);
    console.error('Run "docli token" to set your access token or set a ' +
        'DOCLI_TOKEN environment variable'.red);
    process.exit(1);
  }
}

/**
 * This function sets the DigitalOcean access token.
 * @param {string} token The DigitalOcean access tokenb
 */
exports.set = (token) => {
  fs.writeFileSync(tokenFile, token.trim());
  fs.chmodSync(tokenFile, '600');
  console.log('Token supplied!'.green);
  console.log('This will have no effect if you have supplied a ' +
      'DOCLI_TOKEN environment variable'.red);
}
