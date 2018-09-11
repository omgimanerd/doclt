/**
 * @fileoverview Module handling the load balancer subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'load-balancers'

exports.aliases = ['load-balancer', 'lb']

exports.description = 'Create, delete, and manage load balancers.'.yellow

exports.builder = yargs => {
  yargs.commandDir('load-balancers').demandCommand()
}
