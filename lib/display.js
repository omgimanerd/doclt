/**
 * @fileoverview This module handles displaying various DigitalOcean
 *   resources in neat and orderly tables.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

// eslint-disable-next-line no-unused-vars
const colors = require('colors')
const Table = require('cli-table3')

const format = require('./format')

/**
 * @private
 * Returns true if the --json flag was specified.
 * @return {boolean}
 */
const json = () => {
  return process.argv.indexOf('--json') !== -1
}

/**
 * @private
 * Pushes a row with 'none' into a table.
 * @param {Object} table The table to push into
 */
const pushNone = table => {
  table.push([{
    colSpan: table.options.head.length,
    content: 'none',
    hAlign: 'center'
  }])
}

/**
 * Displays account information.
 * @param {Object} account The account information to display
 */
exports.displayAccount = account => {
  if (json()) {
    console.log(account)
  } else {
    const table = new Table()
    table.push(...format.formatTable([
      ['UUID', format.formatID(account.uuid)],
      ['Status', format.formatAccountStatus(account.status)],
      ['Status message', account.status_message || 'none'],
      ['Email', format.formatName(account.email)],
      ['Email verified', format.formatStatus(account.email_verified)],
      ['Droplet Limit', account.droplet_limit],
      ['Floating IP Limit', account.floating_ip_limit]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a single resource action.
 * @param {Object} action The action to display
 */
exports.displayAction = action => {
  if (json()) {
    console.log(action)
  } else {
    const table = new Table()
    table.push(...format.formatTable([
      ['Action ID', format.formatID(action.id)],
      ['Action Status', format.formatActionStatus(action.status)],
      ['Action Type', action.type],
      ['Started At', format.formatDate(action.started_at)],
      ['Completed At', format.formatDate(action.completed_at)],
      ['Resource Type', action.resource_type],
      ['Resource ID', format.formatID(action.resource_id)],
      ['Resource Region', action.region_slug]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a resource action's ID.
 * @param {Object} action The action to display
 */
exports.displayActionID = action => {
  if (json()) {
    console.log(action)
  } else {
    console.log('Action ID: '.red + format.formatID(action.id))
  }
}

/**
 * Displays a list of resource actions.
 * @param {Array.<Object>} actions The list of actions to display
 * @param {?number=} limit The maximum number of actions to display
 */
exports.displayActions = (actions, limit) => {
  if (typeof limit === 'number') {
    actions = actions.slice(0, limit)
  }
  if (json()) {
    console.log(actions)
  } else {
    const table = new Table({ head: ['ID', 'Status', 'Type', 'Completed'] })
    if (actions.length > 0) {
      table.push(...actions.map(action => {
        return [
          format.formatID(action.id),
          format.formatActionStatus(action.status),
          action.type,
          format.formatDate(action.completed_at)
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a single SSL certificate.
 * @param {Object} certificate The SSL certificate to display
 */
exports.displayCertificate = certificate => {
  if (json()) {
    console.log(certificate)
  } else {
    const table = new Table()
    table.push(...format.formatTable([
      ['ID', format.formatID(certificate.id)],
      ['Name', format.formatName(certificate.name)],
      ['Fingerprint', certificate.sha1_fingerprint],
      ['Type', certificate.type],
      ['Status', format.formatCertificateStatus(certificate.state)],
      ['Created On', format.formatDate(certificate.created_at)],
      ['Expires On', format.formatDate(certificate.not_after)]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a list of SSL certificates.
 * @param {Array.<Object>} certificates The list of SSL certificates}
 */
exports.displayCertificates = certificates => {
  if (json()) {
    console.log(certificates)
  } else {
    const table = new Table({
      head: ['ID', 'Name', 'Expires', 'State']
    })
    if (certificates.length > 0) {
      table.push(...certificates.map(certificate => {
        return [
          format.formatID(certificate.id),
          format.formatName(certificate.name),
          format.formatDate(certificate.not_after),
          format.formatCertificateStatus(certificate.state)
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a single domain.
 * @param {Object} domain The domain to display
 * @param {boolean} zoneFile Whether or not to display just the zone file
 */
exports.displayDomain = (domain, zoneFile) => {
  if (json()) {
    console.log(domain)
  } else if (zoneFile) {
    console.log(domain.zone_file)
  } else {
    const table = new Table()
    table.push(...format.formatTable([
      ['Domain Name', format.formatName(domain.name)],
      ['TTL', domain.ttl],
      ['Zone File', 'Use the --zone-file flag to get the full zone file'.red]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a list of domains.
 * @param {Array.<Object>} domains The list of domains to display
 */
exports.displayDomains = domains => {
  if (json()) {
    console.log(domains)
  } else {
    const table = new Table({
      head: ['Domain Name', 'TTL']
    })
    if (domains.length > 0) {
      table.push(...domains.map(domain => {
        return [format.formatName(domain.name), domain.ttl]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a domain record.
 * @param {Object} record The domain record to display
 */
exports.displayDomainRecord = record => {
  if (json()) {
    console.log(record)
  } else {
    const table = new Table()
    table.push(...format.formatTable([
      ['ID', format.formatID(record.id)],
      ['Type', format.formatDomainType(record.type)],
      ['Name', record.name],
      ['Data', record.data],
      ['Priority', record.priority || 'none'],
      ['Port', record.port || 'none'],
      ['Weight', record.weight || 'none']
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a list of domain records.
 * @param {Array.<Object>} records The list of domain records to display
 */
exports.displayDomainRecords = records => {
  if (json()) {
    console.log(records)
  } else {
    const table = new Table({ head: ['ID', 'Type', 'Name', 'Data'] })
    if (records.length > 0) {
      table.push(...records.map(record => {
        const type = format.formatDomainType(record.type)
        return [format.formatID(record.id), type, record.name, record.data]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a single droplet.
 * @param {Object} droplet The droplet to display
 */
exports.displayDroplet = droplet => {
  if (json()) {
    console.log(droplet)
  } else {
    const table = new Table()
    const v4 = droplet.networks.v4
    const v6 = droplet.networks.v6
    table.push(...format.formatTable([
      ['ID', format.formatID(droplet.id)],
      ['Name', format.formatName(droplet.name)],
      ['Status', format.formatDropletStatus(droplet.status)],
      ['Memory', `${droplet.memory} MB`],
      ['Disk Size', `${droplet.disk} GB`],
      ['VCPUs', droplet.vcpus],
      ['Kernel', droplet.kernel ? format.formatName(droplet.kernel) : 'none'],
      ['Image', `${droplet.image.distribution} ${droplet.image.name}`],
      ['Features', format.defaultJoin(droplet.features)],
      ['Region', droplet.region.name],
      ['IPv4', format.formatIPList(v4.map(network => network.ip_address))],
      ['IPv6', format.formatIPList(v6.map(network => network.ip_address))],
      ['Tags', format.defaultJoin(droplet.tags)],
      ['Created On', format.formatDate(droplet.created_at)]
    ]))
    table.push([{
      colSpan: 2,
      content: 'Backups\n'.red + format.formatIDList(droplet.backup_ids)
    }])
    table.push([{
      colSpan: 2,
      content: 'Snapshots\n'.red + format.formatIDList(droplet.snapshot_ids)
    }])
    table.push([{
      colSpan: 2,
      content: 'Volumes\n'.red + format.formatIDList(droplet.volume_ids)
    }])
    console.log(table.toString())
  }
}

/**
 * Displays a list of droplets.
 * @param {Array.<Object>} droplets The list of droplets
 */
exports.displayDroplets = droplets => {
  if (json()) {
    console.log(droplets)
  } else {
    const table = new Table({
      head: ['ID', 'Name', 'IPv4', 'Status']
    })
    if (droplets.length > 0) {
      table.push(...droplets.map(droplet => {
        const v4 = droplet.networks.v4
        return [
          format.formatID(droplet.id),
          format.formatName(droplet.name),
          format.formatIPList(v4.map(network => network.ip_address)),
          format.formatDropletStatus(droplet.status)
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a single image (backup/snapshot).
 * @param {Object} image The image to display
 */
exports.displayImage = image => {
  if (json()) {
    console.log(image)
  } else {
    const table = new Table()
    table.push(...format.formatTable([
      ['ID', format.formatID(image.id)],
      ['Name', format.formatName(image.name)],
      ['Distribution', image.distribution],
      ['Type', image.type],
      ['Slug', image.slug || 'none'],
      ['Public', format.formatStatus(image.public)],
      ['Regions', format.defaultJoin(image.regions)],
      ['Created On', format.formatDate(image.created_at)],
      ['Size', `${image.size_gigabytes} GB`],
      ['Minimum Disk Size', `${image.min_disk_size} GB`]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a firewall.
 * @param {Object} firewall The firewall to display
 */
exports.displayFirewall = firewall => {
  if (json()) {
    console.log(firewall)
  } else {
    const table = new Table()
    table.push(...format.formatTable([
      ['ID', format.formatID(firewall.id)],
      ['Name', format.formatName(firewall.name)],
      ['Created On', format.formatDate(firewall.created_at)],
      ...format.formatFirewallInboundRules(firewall.inbound_rules),
      ...format.formatFirewallOutboundRules(firewall.outbound_rules),
      ['Droplets Assigned',
        format.formatIDList(firewall.droplet_ids)],
      ['Tags', format.defaultJoin(firewall.tags)]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a list of firewalls
 * @param {Array.<Object>} firewalls The list of firewalls to display
 */
exports.displayFirewalls = firewalls => {
  if (json()) {
    console.log(firewalls)
  } else {
    const table = new Table({ head: ['ID', 'Name', 'Inbound', 'Outbound'] })
    if (firewalls.length > 0) {
      table.push(...firewalls.map(firewall => {
        return [
          format.formatID(firewall.id),
          format.formatName(firewall.name),
          format.formatFirewallRulesShort(firewall.inbound_rules),
          format.formatFirewallRulesShort(firewall.outbound_rules)
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a floating IP.
 * @param {Object} ip The floating IP to display
 */
exports.displayFloatingIp = ip => {
  if (json()) {
    console.log(ip)
  } else {
    const table = new Table()
    table.push(...format.formatTable([
      ['IP', format.formatIP(ip.ip)],
      ['Region', format.formatName(ip.region.slug)],
      ['Droplet', format.formatIP(ip.droplet ? ip.droplet.ip : 'none')]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a list of floating IPs.
 * @param {Array.<Object>} ips The list of floating IPs to display.
 */
exports.displayFloatingIps = ips => {
  if (json()) {
    console.log(ips)
  } else {
    const table = new Table({ head: ['IP', 'Region', 'Droplet'] })
    if (ips.length > 0) {
      table.push(...ips.map(ip => {
        return [
          format.formatIP(ip.ip),
          format.formatName(ip.region.slug),
          format.formatIP(ip.droplet ? ip.droplet.ip : 'none')
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a list of images.
 * @param {Object} images The list of images to display
 */
exports.displayImages = images => {
  if (json()) {
    console.log(images)
  } else {
    const table = new Table({
      head: [
        'ID',
        `Distribution (${'PUBLIC'.green}) (${'PRIVATE'.blue})`,
        'Minimum Size'
      ]
    })
    if (images.length > 0) {
      images.sort((a, b) => {
        return (a.distribution + a.name).localeCompare(b.distribution + b.name)
      })
      table.push(...images.map(image => {
        const name = `${image.distribution} ${image.name}`
        return [
          format.formatID(image.id),
          image.public ? name.green : name.blue,
          `${image.min_disk_size} GB`
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a list of kernels.
 * @param {Array.<Object>} kernels The list of kernels to display
 */
exports.displayKernels = kernels => {
  if (json()) {
    console.log(kernels)
  } else {
    const table = new Table({
      head: ['ID', 'Name and Version']
    })
    if (kernels.length > 0) {
      table.push(...kernels.map(kernel => {
        return [
          format.formatID(kernel.id),
          `${format.formatName(kernel.name)}\nVersion: ${kernel.version}`
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a load balancer.
 * @param {Object} loadBalancer The load balancer to display
 */
exports.displayLoadBalancer = loadBalancer => {
  if (json()) {
    console.log(loadBalancer)
  } else {
    /**
     * This arrow function is used internally to quickly apply colSpan
     * options to cli-table3 table rows.
     * @param {Array.<string>} row The table row to apply options to
     * @return {Array.<Object>}
     */
    const colSpanner = row => {
      row[1] = {
        colSpan: 3,
        content: row[1]
      }
      return row
    }
    const table = new Table()
    table.push(...format.formatTable([
      ['ID', format.formatID(loadBalancer.id)],
      ['Name', format.formatName(loadBalancer.name)],
      ['IP', format.formatIP(loadBalancer.ip)],
      ['Algorithm', loadBalancer.algorithm],
      ['Status', format.formatLoadBalancerStatus(loadBalancer.status)],
      ['Redirect HTTP to HTTPS', format.formatStatus(
        loadBalancer.redirect_http_to_https)],
      ['Region', loadBalancer.region.name],
      ['Tag', loadBalancer.tag || 'none'],
      ['Droplets Assigned', format.formatIDList(loadBalancer.droplet_ids)],
      ['Created On', format.formatDate(loadBalancer.created_at)]
    ]).map(colSpanner))
    const rules = loadBalancer.forwarding_rules
    table.push([{
      colSpan: 4,
      hAlign: 'center',
      content: 'Forwarding Rules'.red
    }])
    if (rules.length > 0) {
      table.push(...[
        ['Entry'.red, 'Target'.red, 'Certificate ID'.red,
          'TLS Passthrough'.red],
        ...rules.map(rule => {
          return [
            `${rule.entry_protocol}:${rule.entry_port}`,
            `${rule.target_protocol}:${rule.target_port}`,
            format.formatID(rule.certificate_id),
            format.formatStatus(rule.tls_passthrough)
          ]
        })
      ])
    } else {
      table.push([{
        colSpan: 4,
        hAlign: 'center',
        content: 'none'
      }])
    }
    table.push([{
      colSpan: 4,
      hAlign: 'center',
      content: 'Health Check Settings'.red
    }])
    const h = loadBalancer.health_check
    table.push(...format.formatTable([
      ['protocol:port:path', `${h.protocol}:${h.port}:${h.path}`],
      ['Check Interval', `${h.check_interval_seconds} seconds`],
      ['Timeout Duration', `${h.response_timeout_seconds} seconds`],
      ['Unhealthy Droplet Threshold', `${h.unhealthy_threshold} failures`],
      ['Healthy Droplet Threshold', `${h.healthy_threshold} passes`]
    ]).map(colSpanner))
    const s = loadBalancer.sticky_sessions
    if (s.type === 'cookies') {
      table.push([{
        colSpan: 2,
        hAlign: 'center',
        content: 'Stick Sessions Data'
      }])
      table.push(...format.formatTable([
        ['Type', 'cookies'],
        ['Cookie Name', s.cookie_name],
        ['Cookie TTL', `${s.cookie_ttl_seconds} seconds`]
      ]))
    }
    console.log(table.toString())
  }
}

/**
 * Displays a list of load balancers.
 * @param {Array.<Object>} loadBalancers The list of load balancers
 */
exports.displayLoadBalancers = loadBalancers => {
  if (json()) {
    console.log(loadBalancers)
  } else {
    const table = new Table({
      head: ['ID', 'Name', 'IP', 'Status']
    })
    if (loadBalancers.length > 0) {
      table.push(...loadBalancers.map(loadBalancer => {
        return [
          format.formatID(loadBalancer.id),
          format.formatName(loadBalancer.name),
          format.formatIP(loadBalancer.ip),
          format.formatLoadBalancerStats(loadBalancer.status)
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a message upon completion of an action. This is for human
 * readability only and will be not display if json output is enabled.
 * @param {?string} message The message to display.
 */
exports.displayMessage = message => {
  if (!json() && typeof message === 'string' && message !== '') {
    console.log(message.red)
  }
}

/**
 * Displays a list of regions.
 * @param {Array.<Object>} regions The list of regions to display
 */
exports.displayRegions = regions => {
  if (json()) {
    console.log(regions)
  } else {
    const table = new Table({
      head: ['ID', 'Name', 'Sizes', 'Features', 'Available']
    })
    if (regions.length > 0) {
      regions.sort((a, b) => {
        return a.slug.localeCompare(b.slug)
      })
      table.push(...regions.map(region => {
        return [
          format.formatID(region.slug),
          format.formatName(region.name),
          format.defaultJoin(region.sizes),
          format.defaultJoin(region.features),
          format.formatStatus(region.available)
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a list of droplet sizes.
 * @param {Array.<Object>} sizes The list of sizes to display
 */
exports.displaySizes = sizes => {
  if (json()) {
    console.log(sizes)
  } else {
    const table = new Table({
      head: ['ID', 'Memory', 'VCPUs', 'Disk Space', 'Transfer\nBandwidth',
        'Price/Month']
    })
    if (sizes.length > 0) {
      table.push(...sizes.map(size => {
        return [
          format.formatID(size.slug),
          `${size.memory} MB`,
          size.vcpus,
          `${size.disk} GB`,
          `${size.transfer} TB`,
          `$${size.price_monthly}`
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a list of snapshots.
 * @param {Array.<Object>} snapshots The list of snapshots to display
 */
exports.displaySnapshots = snapshots => {
  if (json()) {
    console.log(snapshots)
  } else {
    const table = new Table({
      head: ['ID', 'Name', 'Created On']
    })
    if (snapshots.length > 0) {
      table.push(...snapshots.map(snapshot => {
        return [
          format.formatID(snapshot.id),
          format.formatName(snapshot.name),
          format.formatDate(snapshot.created_at)
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a single SSH key.
 * @param {Object} key The key to display
 */
exports.displaySshKey = key => {
  if (json()) {
    console.log(key)
  } else {
    const table = new Table()
    table.push(...format.formatTable([
      ['ID', format.formatID(key.id)],
      ['Name', format.formatName(key.name)],
      ['Fingerprint', key.fingerprint],
      ['Public Key', 'Use the --key flag to get the full public key'.red]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a list of SSH keys.
 * @param {Array.<Object>} keys The list of SSH keys to display
 */
exports.displaySshKeys = keys => {
  if (json()) {
    console.log(keys)
  } else {
    const table = new Table({ head: ['ID', 'Name', 'Fingerprint'] })
    if (keys.length > 0) {
      table.push(...keys.map(key => {
        return [
          format.formatID(key.id),
          format.formatName(key.name),
          key.fingerprint
        ]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a single volume.
 * @param {Object} volume The volume to display
 */
exports.displayVolume = volume => {
  if (json()) {
    console.log(volume)
  } else {
    const table = new Table()
    table.push([{
      colSpan: 2,
      content: 'ID: '.red + format.formatID(volume.id)
    }])
    table.push(...format.formatTable([
      ['Name', format.formatName(volume.name)],
      ['Size', `${volume.size_gigabytes} GB`],
      ['Region', volume.region.slug],
      ['Description', format.formatTextWrap(volume.description, 25)],
      ['Attached To', format.formatIDList(volume.droplet_ids)],
      ['Created On', format.formatDate(volume.created_at)]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a list of volumes.
 * @param {Array.<Object>} volumes The list of volumes to display
 */
exports.displayVolumes = volumes => {
  if (json()) {
    console.log(volumes)
  } else {
    const table = new Table()
    if (volumes.length > 0) {
      volumes.forEach(volume => {
        table.push([{
          colSpan: 2,
          content: 'ID: '.red + format.formatID(volume.id)
        }])
        table.push(...format.formatTable([
          ['Name', format.formatName(volume.name)],
          ['Size', `${volume.size_gigabytes} GB`],
          ['Region', volume.region.slug],
          ['Attached To', format.formatIDList(volume.droplet_ids)]
        ]))
      })
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}

/**
 * Displays a single tag.
 * @param {Object} tag The tag to display
 */
exports.displayTag = tag => {
  if (json()) {
    console.log(tag)
  } else {
    const table = new Table()
    const lastDropletTagged = tag.resources.droplets.last_tagged || {}
    table.push(...format.formatTable([
      ['Tag', format.formatName(tag.name)],
      ['Droplets Tagged', tag.resources.droplets.count],
      ['Last Droplet Tagged', format.formatID(lastDropletTagged.id)]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a list of tags
 * @param {Array.<Object>} tags The list of tags to display
 */
exports.displayTags = tags => {
  if (json()) {
    console.log(tags)
  } else {
    const table = new Table({
      head: ['Tag', 'Droplets Tagged']
    })
    if (tags.length > 0) {
      table.push(...tags.map(tag => {
        return [format.formatName(tag.name), tag.resources.droplets.count]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}
