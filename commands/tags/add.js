/**
 * @fileoverview Module handling the tag create command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'add <name>';

exports.aliases = ['create'];

exports.description = 'Add a tag'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 1, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.tags.create({ name: argv.name }, (error, tag) => {
    Util.handleError(error);
    Display.displayTag(tag);
  });
};
