/**
 * @fileoverview Module handling the tag listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all tags'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 1, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.tags.list((error, tags) => {
    Util.handleError(error);
    Display.displayTags(tags);
  });
};
