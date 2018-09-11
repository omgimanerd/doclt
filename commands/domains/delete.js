/**
 * @fileoverview Module handling the domain name delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <domain>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a domain name'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.domains.delete(argv.domain, error => {
    util.handleError(error)
    display.displayMessage(`Domain name ${argv.domain} deleted.`)
  })
}
