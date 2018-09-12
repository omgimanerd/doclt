/**
 * @fileoverview Module handling the droplet creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

const OPTIONS = [
  'name', 'region', 'size', 'image', 'ssh_keys', 'backups', 'ipv6',
  'private_networking', 'user_data', 'monitoring', 'volumes', 'tags'
]

exports.command = 'add'

exports.aliases = ['create']

exports.description = 'Create a new droplet'.yellow

exports.builder = yargs => {
  yargs.option('name', {
    description: 'Set the droplet name'.yellow,
    required: true
  }).option('region', {
    description: 'Set the droplet region'.yellow,
    required: true
  }).option('size', {
    description: 'Set the droplet size slug'.yellow,
    required: true
  }).option('image', {
    description: 'Set the droplet base image ID or slug identifier'.yellow,
    required: true
  }).option('ssh_keys', {
    description: 'Set the droplet SSH keys'.yellow,
    array: true
  }).option('backups', {
    description: 'Enable backups'.yellow,
    'boolean': true
  }).option('ipv6', {
    description: 'Enable IPv6'.yellow,
    'boolean': true
  }).option('private_networking', {
    description: 'Enable private networking'.yellow,
    'boolean': true
  }).option('monitoring', {
    description: 'Enable monitoring'.yellow,
    'boolean': true
  }).option('user_data', {
    description: 'Set custom user data'.yellow
  }).option('volumes', {
    description: 'Set volume IDs to attach'.yellow,
    array: true
  }).option('tags', {
    description: 'Set tags to apply'.yellow,
    array: true
  }).group(OPTIONS, 'Droplet Attributes:')
    .example(`$0 droplets add \\
      --name box \\
      --region nyc1 \\
      --size 512mb \\
      --image ubuntu-14-04-x32 \\
      --ipv6 \\
      --volumes 1234 4356 \\
      --tags biggestbox bestestbox`)
}

exports.handler = argv => {
  const client = util.getClient()
  const args = util.filterOptions(argv, OPTIONS)
  client.droplets.create(args, (error, droplet) => {
    util.handleError(error)
    display.displayMessage('Droplet created.')
    display.displayDroplet(droplet)
  })
}
