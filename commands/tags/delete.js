/**
 * @fileoverview Module handling the tag delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <tag>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a tag'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.tags.delete(argv.tag, error => {
    util.handleError(error)
    display.displayMessage(`Tag ${argv.tag} deleted.`)
  })
}
