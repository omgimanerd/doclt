/**
 * @fileoverview Module handling the token setting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'token <token>';

exports.aliases = ['authenticate'];

exports.describe = 'Set the DigitalOcean auth token'.yellow;

exports.handler = (argv) => {
  var token = require('../lib/token');
  token.set(argv.token);
};
