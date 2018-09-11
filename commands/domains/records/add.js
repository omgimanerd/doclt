/**
 * @fileoverview Module handling the domain record adding command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const prompt = require('prompt')

const display = require('../../../lib/display')
const util = require('../../../lib/util')

const TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV', 'NS']

exports.command = 'add <domain>'

exports.aliases = ['create']

exports.description = 'Add a record to a domain'.yellow

exports.builder = yargs => {
  yargs.option('type', {
    description: 'Set the domain record type'.yellow,
    choices: TYPES
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
}

exports.handler = argv => {
  const client = util.getClient()
  prompt.override = argv
  prompt.message = ''
  prompt.start()
  prompt.get({
    properties: {
      type: {
        description: 'Domain Type'.yellow,
        conform: value => TYPES.indexOf(value) !== -1,
        message: 'Domain type must be A, AAAA, CNAME, MX, TXT, SRV, or NS',
        required: true
      }
    }
  }, (error, result) => {
    util.handleError(error)
    const schema = { properties: {} }
    // eslint-disable-next-line require-jsdoc
    const property = (description, required) => {
      return { description, required }
    }
    const type = result.type
    switch (type) {
    case 'A':
    case 'AAAA':
      schema.properties = {
        name: property('Name'),
        data: property('IP address')
      }
      break
    case 'CNAME':
      schema.properties = {
        name: property('Name'),
        data: property('Hostname')
      }
      break
    case 'MX':
      schema.properties = {
        data: property('Hostname'),
        priority: property('Priority')
      }
      break
    case 'TXT':
      schema.properties = {
        name: property('Name'),
        data: property('Text')
      }
      break
    case 'SRV':
      schema.properties = {
        name: property('Name'),
        data: property('Hostname'),
        priority: property('Priority'),
        port: property('Port'),
        weight: property('Weight')
      }
      break
    case 'NS':
      schema.properties = {
        data: property('Hostname')
      }
      break
    }
    prompt.get(schema, (promptError, data) => {
      util.handleError(promptError)
      const domain = argv.domain
      data.type = type
      client.domains.createRecord(domain, data, (clientError, record) => {
        util.handleError(clientError)
        display.displayMessage('New domain record added.')
        display.displayDomainRecord(record)
      })
    })
  })
}
