/**
 * @fileoverview Module handling the tag getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'get <tag>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a tag'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.tags.get(argv.tag, (error, tag) => {
    Util.handleError(error)
    display.displayTag(tag)
  })
}
