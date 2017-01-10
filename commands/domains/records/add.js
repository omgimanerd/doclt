/**
 * @fileoverview Module handling the domain record adding command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'add <domain>';

exports.aliases = ['create'];

exports.description = 'Add a domain record to a domain'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');
  var prompt = require('prompt');

  var token = require('../../../lib/token');
  var util = require('../../../lib/util');
  var client = digitalocean.client(token.get());

  prompt.message = '';
  prompt.message = '';
  prompt.start();
  prompt.get({
    properties: {
      type: {
        description: 'Domain Type',
        type: 'string',
        pattern: /^(A|AAAA|CNAME|MX|TXT|SRV|NS)$/,
        message: 'Domain type must be A, AAAA, CNAME, MX, TXT, SRV, or NS',
        required: true
      }
    }
  }, (error, result) => {
    util.handleError(error);
    var schema = { properties: {} };
    var property = (description, required) => {
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
    prompt.get(schema, (error, result) => {
      util.handleError(error);
      result.type = type;
      client.domains.createRecord(argv.domain, result, (error, record) => {
        util.handleError(error);
        console.log('New domain record added.'.red);
        console.log('Domain Record ID: '.red + record.id);
        console.log('Domain Record Type: '.red + record.type);
        console.log('Domain Record Name: '.red + record.name);
        console.log('Domain Record Data: '.red + record.data);
        console.log('Domain Record Priority: '.red + record.priority);
        console.log('Domain Record Port: '.red + record.port);
        console.log('Domain Record Weight: '.red + record.weight);
      });
    });
  });
};
