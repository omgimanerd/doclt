/**
 * @fileoverview Module handling the domain record getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'get <domain> <record id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a domain record'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  const domain = argv.domain
  const recordid = argv.recordid
  client.domains.getRecord(domain, recordid, (error, record) => {
    util.handleError(error)
    display.displayDomainRecord(record)
  })
}
