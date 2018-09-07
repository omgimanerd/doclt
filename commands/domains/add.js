/**
 * @fileoverview Module handling the domain name add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'add <domain> <ip>'

exports.aliases = ['create']

exports.description = 'Add a domain name'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()

  client.domains.create({
    name: argv.domain,
    // eslint-disable-next-line camelcase
    ip_address: argv.ip
  }, (error, domain) => {
    util.handleError(error)
    display.displayMessage('New domain name added.')
    display.displayDomain(domain, false)
  })
}
