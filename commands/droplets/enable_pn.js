/**
 * @fileoverview Module handling private networking enable command for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'enable_pn <droplet id>';

exports.aliases = ['enable_private_networking'];

exports.description = 'Enable private networking on a droplet.'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.enablePrivateNetworking(argv.dropletid, (error, action) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Private networking enabled.'.red);
      console.log('Action ID: '.red + action.id.toString().bold.cyan);
    }
  });
};
