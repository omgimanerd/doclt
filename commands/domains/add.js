/**
 * @fileoverview Module handling the domain name add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'add <domain> <ip>'

exports.aliases = ['create']

exports.description = 'Add a domain name'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()

  client.domains.create({
    name: argv.domain,
    // eslint-disable-next-line camelcase
    ip_address: argv.ip
  }, (error, domain) => {
    Util.handleError(error)
    Display.displayDomain(domain, false, 'New domain name added.')
  })
}
