/**
 * @fileoverview Module handling the token setting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'token <token>';

exports.describe = 'Set the DigitalOcean auth token';

exports.builder = (yargs) => {
  yargs.demandCommand(1);
};

exports.handler = (argv) => {
  var token = require('../lib/token');
  token.set(argv.token);
};
