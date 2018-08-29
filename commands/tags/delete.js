/**
 * @fileoverview Module handling the tag delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'delete <tag>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a tag'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.tags.delete(argv.tag, error => {
    Util.handleError(error)
    display.displayMessage(`Tag ${argv.tag} deleted.`)
  })
}
