/**
 * @fileoverview Module handling the domain record adding command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

const TYPES = ['A', 'AAAA', 'CAA', 'CNAME', 'MX', 'NS', 'TXT', 'SRV']
const OPTIONS = [
  'type', 'name', 'data', 'priority', 'port', 'ttl', 'weight', 'flags',
  'tag'
]

exports.command = 'add <domain>'

exports.aliases = ['create']

exports.description = 'Add a record to a domain'.yellow

exports.builder = yargs => {
  yargs.option('type', {
    description: 'Set the domain record type'.yellow,
    required: true,
    choices: TYPES
  }).option('name', {
    description: `Set the domain record hostname, alias, or service.
    Required for A, AAAA, CAA, CNAME, TXT, SRV.`.yellow
  }).option('data', {
    description: 'Set the domain record data.'.yellow,
    required: true
  }).option('priority', {
    description: `Set the domain record priority.
    Required for MX and SRV.`.yellow
  }).option('port', {
    description: `Set the domain record port.
    Required for SRV.`.yellow
  }).option('ttl', {
    description: 'Set the domain record time to live.'.yellow
  }).option('weight', {
    description: `Set the domain record weight.
    Required for SRV.`.yellow
  }).option('flags', {
    description: `An unsigned int between 0-255.
    Required for CAA.`.yellow
  }).option('tag', {
    description: `Set the domain record parameter tag.
    Required for CAA.`.yellow,
    choices: ['issue', 'issuewild', 'iodef']
  }).group(OPTIONS, 'Domain Record Attributes:')
    .example(`$0 domains records add google.com \\
      --type A \\
      --name @ \\
      --data 172.217.6.206`)
}

exports.handler = argv => {
  const client = util.getClient()
  const args = util.filterOptions(argv, OPTIONS)
  client.domains.createRecord(argv.domain, args, (error, record) => {
    util.handleError(error)
    display.displayMessage('New domain record added.')
    display.displayDomainRecord(record)
  })
}
