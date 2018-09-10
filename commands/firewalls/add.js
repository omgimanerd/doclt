/**
 * @fileoverview Module handling the firewall creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const prompt = require('prompt')

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'add'

exports.aliases = ['create']

exports.description = 'Create a new firewall'.yellow

exports.builder = yargs => {
  yargs.option('name', {
    description: 'Set the firewall name'.yellow
  })
  util.globalConfig(yargs)
}

exports.handler = argv => {
  const client = util.getClient()
  prompt.message = ''
  prompt.override = argv
  prompt.start()
  prompt.get({
    properties: {
      name: {
        description: 'Firewall name'.yellow,
        required: true

      },
    }
  })
}
