/**
 * @fileoverview Module handling the token setting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../lib/util');

exports.command = 'token <token>';

exports.aliases = ['auth', 'authenticate'];

exports.description = 'Set the DigitalOcean auth token'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var token = require('../lib/token');
  token.set(argv.token);
};
