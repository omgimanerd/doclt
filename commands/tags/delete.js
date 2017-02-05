/**
 * @fileoverview Module handling the tag delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'delete <tag>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a tag'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.tags.delete(argv.tag, (error) => {
    Util.handleError(error);
    Display.displayMessage('Tag deleted.');
  });
};