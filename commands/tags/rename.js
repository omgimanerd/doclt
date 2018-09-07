/**
 * @fileoverview Module handling the renaming of a tag.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'rename <tag> <new tag>'

exports.aliases = ['update']

exports.description = 'Rename a tag'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  client.tags.update(argv.tag, { name: argv.newtag }, (error, tag) => {
    util.handleError(error)
    display.displayMessage('Tag renamed.')
    display.displayTag(tag)
  })
}
