/**
 * @fileoverview Module handling the tag delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <tag>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a tag'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var tag = argv.tag;
  client.tags.delete(tag, function(error) {
    Util.handleError(error);
    Display.displayMessage('Tag {0} deleted.', tag);
  });
};
