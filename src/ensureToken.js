/**
 * [exports description]
 * @param {Function} callback [description]
 * @return {[type]}
 */

module.exports = function(callback) {
  var fs = require('fs');
  var path = require('path');
  if (process.env.DOCLI_TOKEN) {
    callback(process.env.DOCLI_TOKEN);
  }
  var tokenFile = path.join(__dirname, '.docli_token');
  fs.readFile(tokenFile, 'utf-8', function(error, data) {
    if (error) {
      console.log('Digital Ocean access token not specified!');
      console.log('Run docli authenticate to add your access token.');
    } else {
      callback(data);
    }
  });
};
