/**
 * @fileoverview Module handling the domain record listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../../lib/Display')
const Util = require('../../../lib/Util')

exports.command = 'list <domain>'

exports.aliases = ['ls']

exports.description = 'List all records for a domain'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.domains.listRecords(argv.domain, (error, records) => {
    Util.handleError(error)
    Display.displayDomainRecords(records)
  })
}
