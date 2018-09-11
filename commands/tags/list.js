/**
 * @fileoverview Module handling the tag listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all tags'.yellow

exports.handler = () => {
  const client = util.getClient()
  client.tags.list((error, tags) => {
    util.handleError(error)
    display.displayTags(tags)
  })
}
