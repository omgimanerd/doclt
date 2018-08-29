/**
 * @fileoverview Module handling the domain record getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'get <domain> <record id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a domain record'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const domain = argv.domain
  const recordid = argv.recordid
  client.domains.getRecord(domain, recordid, (error, record) => {
    Util.handleError(error)
    display.displayDomainRecord(record)
  })
}
