/**
 * @fileoverview Module handling the untagging of a resource.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'untag <resource type> <resource id> <tag>'

exports.description = 'Untag a resource'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  const tag = argv.tag
  const resourcetype = argv.resourcetype
  const resourceid = argv.resourceid
  client.tags.untag(argv.tag, [{
  // eslint-disable-next-line camelcase
    resource_type: resourcetype,
    // eslint-disable-next-line camelcase
    resource_id: resourceid
  }], error => {
    util.handleError(error)
    display.displayMessage(
      `Tag ${tag} removed from ${resourcetype} ${resourceid}`)
  })
}
