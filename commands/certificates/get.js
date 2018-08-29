/**
 * Module handling the certificate getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'get <certificate id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about an SSL certificate'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.certificates.get(argv.certificateid, (error, certificate) => {
    Util.handleError(error)
    display.displayCertificate(certificate)
  })
}
