/**
 * @fileoverview Module handling the floating-ips add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'add <droplet id/region>'

exports.aliases = ['create']

exports.description = 'Create a floating IP'.yellow

exports.builder = yargs => {
  yargs.option('type', {
    description: 'The type of data to associate the floating-ip to',
    required: true,
    choices: ['droplet', 'region']
  }).group(['type'], 'Required Flags:')
}

exports.handler = argv => {
  const client = util.getClient()
  client.floatingIps.create({
    [argv.type]: argv['dropletid/region']
  }, (error, ip) => {
    util.handleError(error)
    display.displayFloatingIp(ip)
  })
}
