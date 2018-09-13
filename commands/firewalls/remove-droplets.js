/**
 * @fileoverview Module handling the firewall droplet removal command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'remove-droplets <firewall id> [droplet ids...]'

exports.aliases = ['remove-droplet']

exports.description = 'Remove droplets from a firewall'.yellow

exports.builder = yargs => {
  yargs.example('$0 firewalls remove-droplets 12345 5352 3523')
}

exports.handler = argv => {
  const client = util.getClient()
  const firewallId = argv.firewallid
  const dropletIds = argv.dropletIds || []
  client.firewalls.removeDroplets(firewallId, dropletIds, error => {
    util.handleError(error)
    const s = dropletIds.length > 0 ? 's' : ''
    const dropletString = dropletIds.join(', ')
    display.displayMessage(
      `Droplet${s} ${dropletString} added to firewall ${firewallId}.`
    )
  })
}
