/**
 * @fileoverview Module handling the firewall droplet add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'add-droplets <firewall id> [droplet ids..]'

exports.aliases = ['add-droplet']

exports.description = 'Add droplets to a firewall'.yellow

exports.builder = yargs => {
  yargs.example('$0 firewalls add-droplets 12345 34332 253352 22533')
}

exports.handler = argv => {
  const client = util.getClient()
  const firewallId = argv.firewallid
  const dropletIds = argv.dropletIds || []
  client.firewalls.addDroplets(firewallId, dropletIds, error => {
    util.handleError(error)
    const s = dropletIds.length > 0 ? 's' : ''
    const dropletString = dropletIds.join(', ')
    display.displayMessage(
      `Droplet${s} ${dropletString} added to firewall ${firewallId}.`
    )
  })
}
