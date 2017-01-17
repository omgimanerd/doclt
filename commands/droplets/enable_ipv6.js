/**
 * @fileoverview Module handling the IPv6 enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'enable_ipv6 <droplet id>';

exports.aliases = ['ipv6'];

exports.description = 'Enable IPv6 on a droplet.'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.enableIpv6(argv.dropletid, (error) => {
    util.handleError(error);
    console.log('IPv6 enabled.'.red);
  });
};
