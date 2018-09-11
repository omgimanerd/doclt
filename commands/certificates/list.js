/**
 * @fileoverview Module handling the certificate listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all SSL certificates'.yellow

exports.handler = () => {
  const client = util.getClient()
  client.certificates.list((error, certificates) => {
    util.handleError(error)
    display.displayCertificates(certificates)
  })
}
