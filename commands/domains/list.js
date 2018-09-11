/**
 * @fileoverview Module handling the domain name listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all domain names'.yellow

exports.handler = () => {
  const client = util.getClient()
  client.domains.list((error, domains) => {
    util.handleError(error)
    display.displayDomains(domains)
  })
}
