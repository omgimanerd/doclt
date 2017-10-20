/**
 * @fileoverview Module handling the tag delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'delete <tag>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a tag'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const tag = argv.tag
  client.tags.delete(tag, error => {
    Util.handleError(error)
    Display.displayMessage('Tag {0} deleted.', tag)
  })
}
