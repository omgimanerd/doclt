/**
 * @fileoverview Module handling the domain name getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <domain>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a domain name'.yellow

exports.builder = yargs => {
  yargs.option('zone-file', {
    description: 'Show only the zone file'.yellow
  }).group(['zone-file'], 'Domain Options:')
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.domains.get(argv.domain, (error, domain) => {
    util.handleError(error)
    display.displayDomain(domain, argv.zoneFile)
  })
}
