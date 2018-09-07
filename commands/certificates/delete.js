/**
 * @fileoverview Module handling the SSL certificate delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'delete <certificate id>'

exports.aliases = ['remove', 'del', 'rm']

exports.description = 'Delete an SSL certificate'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  client.account.deleteSshKey(argv.certificateid, error => {
    util.handleError(error)
    display.displayMessage(`SSL Certificate ${argv.certificateid} deleted.`)
  })
}
