/**
 * @fileoverview Module handling the domain name getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'get <domain>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a domain name'.yellow

exports.builder = yargs => {
  yargs.option('zone-file', {
    description: 'Show only the zone file'.yellow
  }).group(['zone-file'], 'Domain Options:')
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.domains.get(argv.domain, (error, domain) => {
    Util.handleError(error)
    Display.displayDomain(domain, argv.zoneFile)
  })
}
