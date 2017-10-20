/**
 * @fileoverview Module handling the SSH key add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const fs = require('fs')

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'add <name> <keyfile>'

exports.aliases = ['create']

exports.description = 'Add an SSH key'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  try {
    client.account.createSshKey({
      name: argv.name,
      // eslint-disable-next-line camelcase,no-sync
      public_key: fs.readFileSync(argv.keyfile, 'utf-8')
    }, (error, key) => {
      Util.handleError(error)
      Display.displaySshKey(key, false, 'New SSH Key added.')
    })
  } catch (error) {
    Util.handleError(error)
  }
}
