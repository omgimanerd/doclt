/**
 * @fileoverview Module handling the token setting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'token <token>';

exports.aliases = ['auth', 'authenticate'];

exports.description = 'Set the DigitalOcean auth token'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var token = require('../lib/token');
  token.set(argv.token, (error) => {
    Util.handleError(error);
    console.log('Token supplied!'.green);
    console.log('This will have no effect if you have supplied a '.red +
        'DOCLI_TOKEN environment variable'.red);
  });
};
