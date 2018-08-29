/**
 * @fileoverview Module handling the domain record delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'delete <domain> <record id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete a record'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  const domain = argv.domain
  const recordid = argv.recordid
  client.domains.deleteRecord(domain, recordid, error => {
    util.handleError(error)
    display.displayMessage(`Domain record ${recordid} deleted from ${domain}`)
  })
}
