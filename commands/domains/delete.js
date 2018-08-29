/**
 * @fileoverview Module handling the domain name delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'delete <domain>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a domain name'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.domains.delete(argv.domain, error => {
    Util.handleError(error)
    display.displayMessage(`Domain name ${argv.domain} deleted.`)
  })
}
