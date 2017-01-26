/**
 * @fileoverview Module handling the volume action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'list <volume id>';

exports.aliases = ['ls'];

exports.description = 'List all actions performed on a volume'.yellow;

exports.builder = (yargs) => {
  yargs.option('limit', {
    description: 'The maximum number of actions to fetch',
    number: true
  }).group(['limit'], 'Volume Action Options:');
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.volumes.listActions(argv.volumeid, (error, actions) => {
    Util.handleError(error);
    Display.displayActions(actions, argv.limit);
  });
};
