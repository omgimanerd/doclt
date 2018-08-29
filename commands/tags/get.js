/**
 * @fileoverview Module handling the tag getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <tag>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a tag'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.tags.get(argv.tag, (error, tag) => {
    util.handleError(error)
    display.displayTag(tag)
  })
}
