/**
 * @fileoverview Module handling the domain record update command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'update <domain> <record id>'

exports.description = 'Update a domain record'.yellow

exports.builder = yargs => {
  yargs.option('type', {
    description: 'Set the domain record type'.yellow,
    choices: ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV']
  }).option('name', {
    description: 'Set the domain record hostname, alias, or service'.yellow
  }).option('data', {
    description: 'Set the domain record data'.yellow
  }).option('priority', {
    description: 'Set the domain record priority'.yellow
  }).option('port', {
    description: 'Set the domain record port'.yellow
  }).option('weight', {
    description: 'Set the domain record weight'.yellow
  }).group([
    'type', 'name', 'data', 'priority', 'port', 'weight'
  ], 'Domain Record Attributes:')
  util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  const domain = argv.domain
  const id = argv.recordid
  const attributes = {
    type: argv.type,
    name: argv.name,
    data: argv.data,
    priority: argv.priority,
    port: argv.port,
    weight: argv.weight
  }
  client.domains.updateRecord(domain, id, attributes, (error, record) => {
    util.handleError(error)
    display.displayDomainRecord(record)
  })
}
