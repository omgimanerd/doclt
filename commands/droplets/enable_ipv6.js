/**
 * @fileoverview Module handling the IPv6 enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'enable_ipv6 <droplet id>';

exports.aliases = ['ipv6'];

exports.description = 'Enable IPv6 on a droplet.'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.enableIpv6(argv.dropletid, (error, action) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('IPv6 enabled'.red);
      console.log('Action ID: '.red + Util.colorID(action.id));
    }
  });
};
