/**
 * @fileoverview Module handling the domain name listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all domain names'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = () => {
  const client = Util.getClient()
  client.domains.list((error, domains) => {
    Util.handleError(error)
    display.displayDomains(domains)
  })
}
