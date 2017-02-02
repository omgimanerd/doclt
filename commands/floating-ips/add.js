/**
 * @fileoverview Module handling the floating-ips add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'add <droplet id/region>';

exports.aliases = ['create'];

exports.description = 'Create a floating IP'.yellow;

exports.builder = (yargs) => {
  yargs.option('type', {
    description: 'The type of data to associate the floating-ip to',
    required: true,
    choices: ['droplet', 'region']
  }).group(['type'], 'Required Flags:');
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.floatingIps.create({
    [argv.type]: argv['dropletid/region']
  }, (error, ip) => {
    Util.handleError(error);
    Display.displayFloatingIp(ip);
  });
};
