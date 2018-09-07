/**
 * @fileoverview Module handling the SSH key add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const fs = require('fs')

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'add <name> <keyfile>'

exports.aliases = ['create']

exports.description = 'Add an SSH key'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  try {
    client.account.createSshKey({
      name: argv.name,
      // eslint-disable-next-line camelcase,no-sync
      public_key: fs.readFileSync(argv.keyfile, 'utf-8')
    }, (error, key) => {
      util.handleError(error)
      display.displayMessage('New SSH Key added.')
      display.displaySshKey(key, false)
    })
  } catch (error) {
    util.handleError(error)
  }
}
