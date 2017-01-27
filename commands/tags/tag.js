/**
 * @fileoverview Module handling the tagging of a resource.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'tag <resource type> <resource id> <tag>';

exports.aliases = ['apply'];

exports.description = 'Tag a resource'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.tags.tag(argv.tag, [{

  }])
};
