/**
 * @fileoverview Module handling the droplet action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'list <droplet id>';

exports.aliases = ['ls'];

exports.description = 'List all actions performed on a droplet'.yellow;

exports.builder = (yargs) => {
  yargs.option('limit', {
    alias: 'number',
    description: 'The maximum number of actions to fetch',
    number: true
  });
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.listActions(argv.dropletid, (error, actions) => {
    Display.displayActions(error, actions, argv.limit);
  });
};
