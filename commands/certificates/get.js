/**
 * Module handling the certificate getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <certificate id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about an SSL certificate'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.certificates.get(argv.certificateid, (error, certificate) => {
    util.handleError(error)
    display.displayCertificate(certificate)
  })
}
