/**
 * @fileoverview Module handling the renaming of a tag.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'rename <tag> <new tag>';

exports.aliases = ['update'];

exports.description = 'Rename a tag'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.tags.update(argv.tag, { name: argv.newtag }, function(error, tag) {
    Util.handleError(error);
    Display.displayTag(tag, 'Tag renamed.');
  });
};
