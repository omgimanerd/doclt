/**
 * @fileoverview Module handling the droplet password reset command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'password_reset <droplet id>';

exports.aliases = ['password', 'pw'];

exports.description = 'Reset the password on a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.droplets.passwordReset(argv.dropletid, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Droplet password reset.');
  });
};
