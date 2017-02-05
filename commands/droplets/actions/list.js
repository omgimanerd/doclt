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
    description: 'The maximum number of actions to fetch'.yellow,
    number: true
  }).group(['limit'], 'Droplet Actions Options:');
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.droplets.listActions(argv.dropletid, (error, actions) => {
    Util.handleError(error);
    Display.displayActions(actions, argv.limit);
  });
};
