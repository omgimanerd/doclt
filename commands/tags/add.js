/**
 * @fileoverview Module handling the tag create command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'add <tag>'

exports.aliases = ['create']

exports.description = 'Add a tag'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  client.tags.create({ name: argv.tag }, (error, tag) => {
    util.handleError(error)
    display.displayTag(tag)
  })
}
