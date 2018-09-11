/**
 * @fileoverview Module handling the SSH key getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <key id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about an SSH key'.yellow

exports.builder = yargs => {
  yargs.option('key', {
    description: 'Show only the public key'.yellow
  }).group(['key'], 'SSH Key Display Options:')
}

exports.handler = argv => {
  const client = util.getClient()
  client.account.getSshKey(argv.keyid, (error, key) => {
    util.handleError(error)
    if (argv.key) {
      console.log(key.public_key)
    } else {
      display.displaySshKey(key)
    }
  })
}
