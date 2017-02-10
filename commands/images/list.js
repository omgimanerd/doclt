/**
 * @fileoverview Module handling the image listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List images on your account'.yellow;

exports.builder = function(yargs) {
  yargs.option('application', {
    description: 'Show application based images'.yellow
  }).option('distribution', {
    description: 'Show distribution based images'.yellow
  }).option('private', {
    description: 'Show all private user images'.yellow
  }).group(['application', 'distribution', 'private'], 'Image Options:');
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var query = {};
  if (argv.private) {
    query.private = true;
  } else if (argv.application) {
    query.type = 'application';
  } else if (argv.distribution) {
    query.type = 'distribution';
  } else {
    query.page = 1;
    query.per_page = Number.MAX_SAFE_INTEGER;
  }
  client.images.list(query, function(error, images) {
    Util.handleError(error);
    Display.displayImages(images);
  });
};
