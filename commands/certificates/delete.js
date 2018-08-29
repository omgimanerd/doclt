/**
 * @fileoverview Module handling the SSL certificate delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'delete <certificate id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete an SSL certificate'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.account.deleteSshKey(argv.certificateid, error => {
    Util.handleError(error)
    display.displayMessage(`SSL Certificate ${argv.certificateid} deleted.`)
  })
}
