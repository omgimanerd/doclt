/**
 * @fileoverview Module handling the tagging of a resource.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'tag <resource type> <resource id> <tag>';

exports.aliases = ['apply'];

exports.description = 'Tag a resource'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var tag = argv.tag;
  var resourcetype = argv.resourcetype;
  var resourceid = argv.resourceid;
  client.tags.tag(tag, [{
    resource_type: resourcetype,
    resource_id: resourceid
  }], function(error) {
    Util.handleError(error);
    Display.displayMessage(
        '{0} {1} tagged as {2}.', resourcetype, resourceid, tag);
  });
};
