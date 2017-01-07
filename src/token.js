/**
 * @fileoverview This module manages the fetching and setting of a DigitalOcean
 *   auth token.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');
var fs = require('fs');
var path = require('path');
var prompt = require('prompt');

var tokenFile = path.join(__dirname, '.docli_token');

module.exports.get = function() {
  if (process.env.DOCLI_TOKEN) {
    return process.env.DOCLI_TOKEN;
  }
  try {
    var token = fs.readFileSync(tokenFile, 'utf-8');
    process.env.DOCLI_TOKEN = token;
    return token;
  } catch (error) {
    console.error('DigitalOcean access token not available!'.red);
    console.error('Run "docli token" to set your access token'.red);
    console.error('or set a DOCLI_TOKEN environment variable'.red);
    process.exit(1);
  }
}

module.exports.set = function() {
  prompt.message = '';
  prompt.delimeter = '';
  prompt.start();
  prompt.get({
    name: 'token',
    description: 'Enter DigitalOcean auth token',
    required: true
  }, function(error, result) {
    if (!result || !result.token) {
      console.log('\nNo token supplied!'.red);
      process.exit(1);
    }
    fs.writeFileSync(tokenFile, result.token);
    console.log('Token supplied!'.green);
    console.log('This will have no effect if you have supplied a'.red);
    console.log('DOCLI_TOKEN environment variable'.red)
  });
}
