/**
 * @fileoverview Module handling the domain record adding command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var prompt = require('prompt');

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'add <domain>';

exports.aliases = ['create'];

exports.description = 'Add a record to a domain'.yellow;

exports.builder = function(yargs) {
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
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  prompt.override = argv;
  prompt.message = '';
  prompt.start();
  var types = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'SRV', 'NS'];
  prompt.get({
    properties: {
      type: {
        description: 'Domain Type'.yellow,
        type: 'string',
        conform: (value) => types.indexOf(value) != -1,
        message: 'Domain type must be A, AAAA, CNAME, MX, TXT, SRV, or NS',
        required: true
      }
    }
  }, function(error, result) {
    Util.handleError(error);
    var schema = { properties: {} };
    var property = function(description, required) {
      return {
        description: description,
        required: true
      };
    };
    var type = result.type;
    switch (type) {
      case 'A':
      case 'AAAA':
        schema.properties = {
          name: property('Name'),
          data: property('IP address')
        };
        break;
      case 'CNAME':
        schema.properties = {
          name: property('Name'),
          data: property('Hostname')
        };
        break;
      case 'MX':
        schema.properties = {
          data: property('Hostname'),
          priority: property('Priority')
        };
        break;
      case 'TXT':
        schema.properties = {
          name: property('Name'),
          data: property('Text')
        };
        break;
      case 'SRV':
        schema.properties = {
          name: property('Name'),
          data: property('Hostname'),
          priority: property('Priority'),
          port: property('Port'),
          weight: property('Weight')
        };
        break;
      case 'NS':
        schema.properties = {
          data: property('Hostname')
        };
        break;
    }
    prompt.get(schema, function(error, result) {
      Util.handleError(error);
      var domain = argv.domain;
      result.type = type;
      client.domains.createRecord(domain, result, function(error, record) {
        Util.handleError(error);
        Display.displayDomainRecord(record, 'New domain record added.');
      });
    });
  });
};
