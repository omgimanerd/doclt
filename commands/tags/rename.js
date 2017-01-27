/**
 * @fileoverview Module handling the renaming of a tag.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'rename <name> <new name>';

exports.aliases = ['update'];

exports.description = 'Rename a tag'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 1, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.tags.update(argv.name, { name: argv.newname }, (error, tag) => {
    Util.handleError(error);
    Display.displayTag(tag, 'Tag renamed.');
  });
};
