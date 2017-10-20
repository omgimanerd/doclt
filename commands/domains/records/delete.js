/**
 * @fileoverview Module handling the domain record delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../../lib/Display')
const Util = require('../../../lib/Util')

exports.command = 'delete <domain> <record id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a record'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const domain = argv.domain
  const recordid = argv.recordid
  client.domains.deleteRecord(domain, recordid, error => {
    Util.handleError(error)
    Display.displayMessage(
      'Domain record {0} deleted from {1}.', recordid, domain)
  })
}
