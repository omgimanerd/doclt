/**
 * @fileoverview Module handling the untagging of a resource.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'untag <resource type> <resource id> <tag>';

exports.description = 'Untag a resource'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var tag = argv.tag;
  var resourcetype = argv.resourcetype;
  var resourceid = argv.resourceid;
  client.tags.untag(argv.tag, [{
    resource_type: resourcetype,
    resource_id: resourceid
  }], function(error) {
    Util.handleError(error);
    Display.displayMessage(
        'Tag {0} removed from {1} {2}.', tag, resourcetype, resourceid);
  });
};
