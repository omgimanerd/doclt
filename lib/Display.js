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
    table.push(...format.colorTable([
      ['UUID', format.colorID(account.uuid)],
      ['Status', format.colorAccountStatus(account.status)],
      ['Status message', account.status_message || 'none'],
      ['Email', format.colorName(account.email)],
      ['Email verified', format.formatStatus(account.email_verified)],
      ['Droplet Limit', account.droplet_limit],
      ['Floating IP Limit', account.floating_ip_limit]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a single droplet/volume action.
 * @param {Object} action The action to display
 */
exports.displayAction = action => {
  if (json()) {
    console.log(action)
  } else {
    const table = new Table()
    table.push(...format.colorTable([
      ['Action ID', format.colorID(action.id)],
      ['Action Status', format.colorActionStatus(action.status)],
      ['Action Type', action.type],
      ['Started At', format.formatDate(action.started_at)],
      ['Completed At', format.formatDate(action.completed_at)],
      ['Resource Type', action.resource_type],
      ['Resource ID', format.colorID(action.resource_id)],
      ['Resource Region', action.region_slug]
    ]))
    console.log(table.toString())
  }
}

/**
 * Displays a droplet/volume action's ID.
 * @param {Object} action The action to display
 */
exports.displayActionID = action => {
  if (json()) {
    console.log(action)
  } else {
    console.log('Action ID: '.red + format.colorID(action.id))
  }
}

/**
 * Displays a list droplet/volume actions.
 * @param {Array.<Object>} actions The volume/droplet actions to display
 * @param {?number} limit The maximum number of actions to display
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
          format.colorID(action.id),
          format.colorActionStatus(action.status),
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
    table.push(...format.colorTable([
      ['ID', format.colorID(certificate.id)],
      ['Name', format.colorName(certificate.name)],
      ['Fingerprint', certificate.sha1_fingerprint],
      ['Type', certificate.type],
      ['Status', format.colorCertificateStatus(certificate.state)],
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
          format.colorID(certificate.id),
          format.colorName(certificate.name),
          format.formatDate(certificate.not_after),
          format.colorCertificateStatus(certificate.state)
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
 * @param {?string=} message An optional message to display
 */
exports.displayDomain = (domain, zoneFile) => {
  if (json()) {
    console.log(domain)
  } else if (zoneFile) {
    console.log(domain.zone_file)
  } else {
    const table = new Table()
    table.push(...format.colorTable([
      ['Domain Name', format.colorName(domain.name)],
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
        return [format.colorName(domain.name), domain.ttl]
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
 * @param {?string=} message An optional message to display
 */
exports.displayDomainRecord = record => {
  if (json()) {
    console.log(record)
  } else {
    const table = new Table()
    table.push(...format.colorTable([
      ['ID', format.colorID(record.id)],
      ['Type', format.colorDomainType(record.type)],
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
        const type = format.colorDomainType(record.type)
        return [format.colorID(record.id), type, record.name, record.data]
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
 * @param {?string=} message An optional message to display
 */
exports.displayDroplet = droplet => {
  if (json()) {
    console.log(droplet)
  } else {
    const table = new Table()
    const v4 = droplet.networks.v4
    const v6 = droplet.networks.v6
    table.push(...format.colorTable([
      ['ID', format.colorID(droplet.id)],
      ['Name', format.colorName(droplet.name)],
      ['Status', format.colorDropletStatus(droplet.status)],
      ['Memory', `${droplet.memory} MB`],
      ['Disk Size', `${droplet.disk} GB`],
      ['VCPUs', droplet.vcpus],
      ['Kernel', droplet.kernel ? format.colorName(droplet.kernel) : 'none'],
      ['Image', `${droplet.image.distribution} ${droplet.image.name}`],
      ['Features', format.defaultJoin(droplet.features)],
      ['Region', droplet.region.name],
      ['IPv4', format.defaultJoin(v4.map(network => network.ip_address))],
      ['IPv6', format.defaultJoin(v6.map(network => network.ip_address))],
      ['Tags', format.defaultJoin(droplet.tags)],
      ['Created On', format.formatDate(droplet.created_at)]
    ]))
    table.push([{
      colSpan: 2,
      content: 'Backups\n'.red + format.defaultJoin(droplet.backup_ids)
    }])
    table.push([{
      colSpan: 2,
      content: 'Snapshots\n'.red + format.defaultJoin(droplet.snapshot_ids)
    }])
    table.push([{
      colSpan: 2,
      content: 'Volumes\n'.red + format.defaultJoin(droplet.volume_ids)
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
          format.colorID(droplet.id),
          format.colorName(droplet.name),
          format.defaultJoin(v4.map(network => network.ip_address)),
          format.colorDropletStatus(droplet.status)
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
    table.push(...format.colorTable([
      ['ID', format.colorID(image.id)],
      ['Name', format.colorName(image.name)],
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
    table.push(...format.colorTable([
      ['ID', format.colorID(firewall.id)],
      ['Name', format.colorName(firewall.name)],
      ['Created On', format.formatDate(firewall.created_at)],
      ['Inbound Rules']
    ]))
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
    table.push(...format.colorTable([
      ['IP', format.colorID(ip.ip)],
      ['Region', format.colorName(ip.region.slug)],
      ['Droplet', format.colorID(ip.droplet ? ip.droplet.ip : 'none')]
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
          format.colorID(ip.ip),
          format.colorName(ip.region.slug),
          format.colorID(ip.droplet ? ip.droplet.ip : 'none')
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
          format.colorID(image.id),
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
          format.colorID(kernel.id),
          `${format.colorName(kernel.name)}\nVersion: ${kernel.version}`
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
          format.colorID(region.slug),
          format.colorName(region.name),
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
          format.colorID(size.slug),
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
          format.colorID(snapshot.id),
          format.colorName(snapshot.name),
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
 * @param {?boolean=} keyOnly Whether or not to display only the public key
 */
exports.displaySshKey = (key, keyOnly) => {
  if (json()) {
    console.log(key)
  } else if (keyOnly) {
    console.log(key.public_key)
  } else {
    const table = new Table()
    table.push(...format.colorTable([
      ['ID', format.colorID(key.id)],
      ['Name', format.colorName(key.name)],
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
          format.colorID(key.id),
          format.colorName(key.name),
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
      content: 'ID: '.red + format.colorID(volume.id)
    }])
    table.push(...format.colorTable([
      ['Name', format.colorName(volume.name)],
      ['Size', `${volume.size_gigabytes} GB`],
      ['Region', volume.region.slug],
      ['Description', format.formatTextWrap(volume.description, 25)],
      ['Attached To', format.colorID(format.defaultJoin(volume.droplet_ids))],
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
          content: 'ID: '.red + format.colorID(volume.id)
        }])
        table.push(...format.colorTable([
          ['Name', format.colorName(volume.name)],
          ['Size', `${volume.size_gigabytes} GB`],
          ['Region', volume.region.slug],
          ['Attached To',
            format.colorID(format.defaultJoin(volume.droplet_ids))]
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
    table.push(...format.colorTable([
      ['Tag', format.colorName(tag.name)],
      ['Droplets Tagged', tag.resources.droplets.count],
      ['Last Droplet Tagged', format.colorID(lastDropletTagged.id)]
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
        return [format.colorName(tag.name), tag.resources.droplets.count]
      }))
    } else {
      pushNone(table)
    }
    console.log(table.toString())
  }
}
