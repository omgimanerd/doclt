/**
 * @fileoverview Module handling the certificate creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

const OPTIONS = [
  'name', 'private_key', 'leaf_certificate', 'certificate_chain',
  'dns_names', 'type'
]

exports.command = 'add'

exports.aliases = ['create']

exports.description = 'Create/add a new certificate'.yellow

exports.builder = yargs => {
  yargs.options('name', {
    description: 'Set the certificate name'.yellow,
    required: true
  }).option('private_key', {
    description: `Custom Type: A PEM-formatted private-key for the SSL
      certificate`.yellow
  }).option('leaf_certificate', {
    description: `Custom Type: The PEM-formatted SSL certificate
      (filename)`.yellow,
    normalize: true,
    coerce: util.fileReadCoercionFunction
  }).option('certificate_chain', {
    description: `The PEM-formatted trust chain between the certificate
      authority's certificate and your domain's SSL certificate`.yellow
  }).option('dns_names', {
    description: `Let's Encrypt: An array of fully-qualified domain names
      (FQDNs) for which the certificate will be issued`.yellow
  }).option('type', {
    description: 'Set the type of certificate'.yellow,
    required: true,
    choices: ['custom', 'lets_encrypt']
  }).group(OPTIONS, 'Certificate Attributes:')
    .example(`$0 certificates add \\
      --name cert1 \\
      --type custom \\
      --private_key key1234 \\
      --leaf_certificate /home/certificate.cert`)
}

exports.handler = argv => {
  const client = util.getClient()
  const args = util.filterOptions(argv, OPTIONS)
  client.certificates.create(args, (error, certificate) => {
    util.handleError(error)
    display.displayMessage('Certificate created.')
    display.displayCertificate(certificate)
  })
}
