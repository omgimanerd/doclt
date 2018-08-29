/**
 * @fileoverview Module handling the certificate creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const prompt = require('prompt')

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'add'

exports.aliases = ['create']

exports.description = 'Create/add a new certificate'.yellow

exports.builder = yargs => {
  const options = [
    'name', 'private_key', 'leaf_certificate', 'certificate_chain',
    'dns_names', 'type'
  ]
  yargs.options('name', {
    description: 'Set the certificate name'.yellow
  }).option('private_key', {
    description: 'A PEM-formatted private-key for the SSL certificate'.yellow
  }).option('leaf_certificate', {
    description: 'The PEM-formatted SSL certificate (filename)'.yellow
  }).option('certificate_chain', {
    description: `The PEM-formatted trust chain between the certificate
      authority's certificate and your domain's SSL certificate`.yellow
  }).option('dns_names', {
    description: `An array of fully-qualified domain names (FQDNs) for which
      the certificate will be issued. Required for Let's Encrypt`.yellow
  }).option('type', {
    description: 'A string representing the type of certificate.'.yellow,
    choices: ['custom', 'lets_encrypt']
  }).group(options, 'Certificate Attributes:')
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  prompt.message = ''
  prompt.override = argv
  prompt.start()
  prompt.get({
    properties: {
      name: {
        description: 'Certificate name'.yellow,
        required: true
      },
      // eslint-disable-next-line camelcase
      private_key: {
        description: 'PEM-formatted private-key:'.yellow
      },
      // eslint-disable-next-line camelcase
      leaf_certificate: {
        description: 'PEM-formatted SSL certificate (filename)'.yellow
      },
      // eslint-disable-next-line camelcase
      certificate_chain: {
        description: 'PEM-formatted trust chain:'.yellow
      },
      // eslint-disable-next-line camelcase
      dns_names: {
        description: 'Domain names (Let\'s Encrypt) (comma separated)'.yellow,
        before: Util.csvToArray
      },
      type: {
        description: 'Certificate type [custom|lets_encrypt]'.yellow,
        pattern: /(^custom$)|(^lets_encrypt$)/,
        required: true
      }
    }
  }, (error, result) => {
    client.certificates.create(result, (clientError, certificate) => {
      Util.handleError(clientError)
      display.displayMessage('Certificate created.')
      display.displayCertificate(certificate)
    })
  })
}
