/**
 * @fileoverview Module handling the tagging of a resource.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'tag <resource type> <resource id> <tag>'

exports.aliases = ['apply']

exports.description = 'Tag a resource'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  const tag = argv.tag
  const resourcetype = argv.resourcetype
  const resourceid = argv.resourceid
  client.tags.tag(tag, [{
    // eslint-disable-next-line camelcase
    resource_type: resourcetype,
    // eslint-disable-next-line camelcase
    resource_id: resourceid
  }], error => {
    util.handleError(error)
    display.displayMessage(`${resourcetype} ${resourceid} tagged as ${tag}`)
  })
}
