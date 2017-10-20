/**
 * @fileoverview Module handling the untagging of a resource.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'untag <resource type> <resource id> <tag>'

exports.description = 'Untag a resource'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const tag = argv.tag
  const resourcetype = argv.resourcetype
  const resourceid = argv.resourceid
  client.tags.untag(argv.tag, [{
  // eslint-disable-next-line camelcase
    resource_type: resourcetype,
    // eslint-disable-next-line camelcase
    resource_id: resourceid
  }], error => {
    Util.handleError(error)
    Display.displayMessage(
      'Tag {0} removed from {1} {2}.', tag, resourcetype, resourceid)
  })
}
