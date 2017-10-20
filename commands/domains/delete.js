/**
 * @fileoverview Module handling the domain name delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'delete <domain>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a domain name'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const domain = argv.domain
  client.domains.delete(domain, error => {
    Util.handleError(error)
    Display.displayMessage('Domain name {0} deleted.', domain)
  })
}
