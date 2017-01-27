/**
 * @fileoverview Module handling the untagging of a resource.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'untag <resource type> <resource id> <tag>';

exports.description = 'Untag a resource'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.tags.untag(argv.tag, [{
    resource_type: argv.resourcetype,
    resource_id: argv.resourceid
  }], (error) => {
    Util.handleError(error);
    Display.displayMessage('Resource untagged.');
  });
};
