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
    alias: 'number',
    description: 'The maximum number of actions to fetch',
    number: true
  });
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.volumes.listActions(argv.volumeid, (error, actions) => {
    Display.displayActions(error, actions, argv.limit);
  });
};
