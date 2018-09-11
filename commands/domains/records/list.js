/**
 * @fileoverview Module handling the domain record listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'list <domain>'

exports.aliases = ['ls']

exports.description = 'List all records for a domain'.yellow

exports.handler = argv => {
  const client = util.getClient()
  client.domains.listRecords(argv.domain, (error, records) => {
    util.handleError(error)
    display.displayDomainRecords(records)
  })
}
