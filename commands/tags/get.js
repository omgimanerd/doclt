/**
 * @fileoverview Module handling the tag getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'get <name>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a tag'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.tags.get(argv.name, (error, tag) => {
    Util.handleError(error);
    Display.displayTag(tag);
  });
};
