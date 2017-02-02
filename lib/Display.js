/**
 * @fileoverview This module handlings displaying various DigitalOcean
 *   assets in neat and orderly tables.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Table = require('cli-table2');

/**
 * @private
 * This takes an account status and colors it for output.
 * @param {string} status The account status to color
 * @return {string}
 */
var colorAccountStatus = (status) => {
  status = String(status);
  switch (status) {
    case 'active':
      return status.green;
    case 'warning':
      return status.yellow;
    case 'locked':
      return status.red;
  }
  return status;
};

/**
 * @private
 * This takes a droplet action status and colors it for output.
 * @param {string} status The action status to color
 * @return {string}
 */
var colorActionStatus = (status) => {
  status = String(status);
  switch (status) {
    case 'completed':
      return status.green;
    case 'in-progress':
      return status.blue;
    case 'errored':
      return status.red;
  }
  return status;
};

/**
 * @private
 * This takes a domain type and colors it for output.
 * @param {string} type The domain type to color
 * @return {string}
 */
var colorDomainType = (type) => {
  type = String(type);
  switch (type) {
    case 'A':
      return type.yellow;
    case 'AAAA':
      return type.blue;
    case 'CNAME':
      return type.green;
    case 'MX':
      return type.cyan;
    case 'TXT':
      return type.magenta;
    case 'SRV':
      return type.red;
    case 'NS':
      return type.gray;
  }
  return type;
};

/**
 * @private
 * This takes a droplet status and colors it for output.
 * @param {string} status The droplet status to color
 * @return {string}
 */
var colorDropletStatus = (status) => {
  status = String(status);
  switch (status) {
    case 'new':
    case 'off':
      return status.red;
    case 'active':
      return status.green;
    case 'archived':
      return status.blue;
  }
  return status;
};

/**
 * @private
 * Colors any string designated as an ID.
 * @param {string} id The ID to color
 * @return {string}
 */
var colorID = (id) => {
  id = String(id);
  return id === 'null' || id === 'none' ? 'none' : id.bold.cyan;
};

/**
 * @private
 * Colors any string designated as a name.
 * @param {string} name The name to color
 * @return {string}
 */
var colorName = (name) => {
  return String(name).blue;
};

/**
 * @private
 * Colors the first element red in a series of rows for a table.
 * @param {Array.<string>} rows Table rows to color
 * @return {Array.<string>}
 */
var colorTable = (rows) => {
  return rows.map((row) => [row[0].red, row[1]]);
};

/**
 * @private
 * This function joins a list of values by newlines for display in cli-table2.
 * If the resulting string is empty, then it returns the string none.
 * @param {Array.<Object>} dataList A list of objects to display
 * @return {string}
 */
var defaultJoin = (dataList) => {
  return dataList.join('\n').trim() || 'none';
};

/**
 * @private
 * Takes a date string and formats it for display.
 * @param {?string=} date The date as a string
 * @return {string}
 */
var formatDate = (date) => {
  return date ? new Date(date).toLocaleString() : 'n/a';
};

/**
 * @private
 * Given a status, this will return green yes or red no depending on the status.
 * @param {boolean} status The status to check
 * @return {string}
 */
var formatStatus = (status) => {
  return status ? 'yes'.green : 'no'.red;
};

/**
 * @private
 * Takes a string and formats it with newlines such that each line is no
 * greater than a specified line length.
 * @param {string} text The text to format
 * @param {number} maxLineLength The maximum length of any line of text
 * @return {string}
 */
var formatTextWrap = (text, maxLineLength) => {
  var words = text.split(' ');
  var lineLength = 0;
  var output = '';
  for (word of words) {
    if (lineLength + word.length >= maxLineLength) {
      output += '\n' + word + ' ';
      lineLength = word.length + 1;
    } else {
      output += word + ' ';
      lineLength += word.length + 1;
    }
  }
  return output;
};

/**
 * @private
 * Returns true if the --json flag was specified.
 * @return {boolean}
 */
var json = () => {
  return process.argv.includes('--json');
};

/**
 * @private
 * Pushes a row with 'none' into a table.
 * @param {Object} table The table to push into
 * @param {number} colSpan The number of columns to span
 */
var pushNone = (table, colSpan) => {
  table.push([{
    colSpan: colSpan,
    content: 'none',
    hAlign: 'center'
  }]);
};

/**
 * Displays account information.
 * @param {Object} account The account information to display
 */
exports.displayAccount = (account) => {
  if (json()) {
    console.log(account);
  } else {
    var table = new Table();
    table.push([{
      colSpan: 2,
      content: 'UUID: '.red + colorID(account.uuid)
    }]);
    table.push.apply(table, colorTable([
      ['Status', colorAccountStatus(account.status)],
      ['Status message', account.status_message || 'none'],
      ['Email', account.email],
      ['Email verified', formatStatus(account.email_verified)],
      ['Droplet Limit', account.droplet_limit],
      ['Floating IP Limit', account.floating_ip_limit]
    ]));
    console.log(table.toString());
  }
};

/**
 * Displays a single droplet/volume action.
 * @param {Object} action The action to display
 * @param {?string=} message An optional message to display
 */
exports.displayAction = (action, message) => {
  if (json()) {
    console.log(action);
  } else {
    var table = new Table();
    table.push.apply(table, colorTable([
      ['Action ID', colorID(action.id)],
      ['Action Status', colorActionStatus(action.status)],
      ['Action Type', action.type],
      ['Started At', formatDate(action.started_at)],
      ['Completed At', formatDate(action.completed_at)],
      ['Resource Type', action.resource_type],
      ['Resource ID', colorID(action.resource_id)],
      ['Resource Region', action.region_slug]
    ]));
    if (typeof(message) === 'string') {
      console.log(message.red);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a droplet/volume action's ID.
 * @param {Object} action The action to display
 * @param {?message=} message An optional message to display
 */
exports.displayActionID = (action, message) => {
  if (json()) {
    console.log(action);
  } else {
    if (typeof(message) === 'string') {
      console.log(message.red);
    }
    console.log('Action ID: '.red + colorID(action.id));
  }
};

/**
 * Displays a list droplet/volume actions.
 * @param {Array.<Object>} actions The volume/droplet actions to display
 * @param {?number} limit The maximum number of actions to display
 */
exports.displayActions = (actions, limit) => {
  if (typeof(limit) === 'number') {
    actions = actions.slice(0, limit);
  }
  if (json()) {
    console.log(actions);
  } else {
    var table = new Table({ head: ['ID', 'Status', 'Type', 'Completed'] });
    if (actions.length > 0) {
      table.push.apply(table, actions.map((action) => {
        return [
          colorID(action.id),
          colorActionStatus(action.status),
          action.type,
          formatDate(action.completed_at)
        ];
      }));
    } else {
      pushNone(table, 4);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a single domain.
 * @param {Object} domain The domain to display
 * @param {boolean} zoneFile Whether or not to display just the zone file
 * @param {?string=} message An optional message to display
 */
exports.displayDomain = (domain, zoneFile, message) => {
  if (json()) {
    console.log(domain);
  } else if (zoneFile) {
    console.log(domain.zone_file);
  } else {
    var table = new Table();
    table.push.apply(table, colorTable([
      ['Domain Name', colorName(domain.name)],
      ['TTL', domain.ttl],
      ['Zone File', 'Use the --zone-file flag to get the full zone file'.red]
    ]));
    if (typeof(message) === 'string') {
      console.log(message.red);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a list of domains.
 * @param {Array.<Object>} domains The list of domains to display
 */
exports.displayDomains = (domains) => {
  if (json()) {
    console.log(domains);
  } else {
    var table = new Table({
      head: ['Domain Name', 'TTL']
    });
    if (domains.length > 0) {
      table.push.apply(table, domains.map((domain) => {
        return [colorName(domain.name), domain.ttl];
      }));
    } else {
      pushNone(table, 2);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a domain record.
 * @param {Object} record The domain record to display
 * @param {?string=} message An optional message to display
 */
exports.displayDomainRecord = (record, message) => {
  if (json()) {
    console.log(record);
  } else {
    var table = new Table();
    table.push.apply(table, colorTable([
      ['ID', colorID(record.id)],
      ['Type', colorDomainType(record.type)],
      ['Name', record.name],
      ['Data', record.data],
      ['Priority', record.priority || 'none'],
      ['Port', record.port || 'none'],
      ['Weight', record.weight || 'none']
    ]));
    if (typeof(message) === 'string') {
      console.log(message.red);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a list of domain records.
 * @param {Array.<Object>} records The list of domain records to display
 */
exports.displayDomainRecords = (records) => {
  if (json()) {
    console.log(records);
  } else {
    var table = new Table({ head: ['ID', 'Type', 'Name', 'Data'] });
    if (records.length > 0) {
      table.push.apply(table, records.map((record) => {
        var type = colorDomainType(record.type);
        return [colorID(record.id), type, record.name, record.data];
      }));
    } else {
      pushNone(table, 4);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a single droplet.
 * @param {Object} droplet The droplet to display
 * @param {?string=} message An optional message to display
 */
exports.displayDroplet = (droplet, message) => {
  if (json()) {
    console.log(droplet);
  } else {
    var table = new Table();
    var v4 = droplet.networks.v4;
    var v6 = droplet.networks.v6;
    table.push.apply(table, colorTable([
      ['ID', colorID(droplet.id)],
      ['Name', colorName(droplet.name)],
      ['Status', colorDropletStatus(droplet.status)],
      ['Memory', droplet.memory + ' MB'],
      ['Disk Size', droplet.disk + ' GB'],
      ['VCPUs', droplet.vcpus],
      ['Kernel', droplet.kernel ? colorName(droplet.kernel) : 'none'],
      ['Image', droplet.image.distribution + ' ' + droplet.image.name],
      ['Features', defaultJoin(droplet.features)],
      ['Region', droplet.region.name],
      ['IPv4', defaultJoin(v4.map((network) => network.ip_address))],
      ['IPv6', defaultJoin(v6.map((network) => network.ip_address))],
      ['Tags', defaultJoin(droplet.tags)],
      ['Created At', formatDate(droplet.created_at)]
    ]));
    table.push([{
      colSpan: 2,
      content: 'Backups\n'.red + defaultJoin(droplet.backup_ids)
    }]);
    table.push([{
      colSpan: 2,
      content: 'Snapshots\n'.red + defaultJoin(droplet.snapshot_ids)
    }]);
    table.push([{
      colSpan: 2,
      content: 'Volumes\n'.red + defaultJoin(droplet.volume_ids)
    }]);
    if (typeof(message) === 'string') {
      console.log(message.red);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a list of droplets.
 * @param {Array.<Object>} droplets The list of droplets
 */
exports.displayDroplets = (droplets) => {
  if (json()) {
    console.log(droplets);
  } else {
    var table = new Table({
      head: ['ID', 'Name', 'IPv4', 'Status']
    });
    if (droplets.length > 0) {
      table.push.apply(table, droplets.map((droplet) => {
        var v4 = droplet.networks.v4;
        return [
          colorID(droplet.id),
          colorName(droplet.name),
          defaultJoin(v4.map((network) => network.ip_address)),
          colorDropletStatus(droplet.status)
        ];
      }));
    } else {
      pushNone(table, 4);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a single image (backup/snapshot).
 * @param {Object} image The image to display
 */
exports.displayImage = (image) => {
  if (json()) {
    console.log(image);
  } else {
    var table = new Table();
    table.push.apply(table, colorTable([
      ['ID', colorID(image.id)],
      ['Name', colorName(image.name)],
      ['Distribution', image.distribution],
      ['Type', image.type],
      ['Slug', image.slug || 'none'],
      ['Public', formatStatus(image.public)],
      ['Regions', defaultJoin(image.regions)],
      ['Created At', formatDate(image.created_at)],
      ['Size', image.size_gigabytes + ' GB'],
      ['Minimum Disk Size', image.min_disk_size + ' GB']
    ]));
    console.log(table.toString());
  }
};

/**
 * Displays a list of images.
 * @param {Object} images The list of images to display
 */
exports.displayImages = (images) => {
  if (json()) {
    console.log(images);
  } else {
    var table = new Table({
      head: [
        'ID',
        'Distribution (' + 'PUBLIC'.green + ') (' + 'PRIVATE'.blue + ')',
        'Minimum Size'
      ]
    });
    if (images.length > 0) {
      images.sort((a, b) => {
        a = a.distribution + a.name;
        b = b.distribution + b.name;
        return a.localeCompare(b);
      });
      table.push.apply(table, images.map((image) => {
        var name = image.distribution + ' ' + image.name;
        return [
          colorID(image.id),
          image.public ? name.green : name.blue,
          image.min_disk_size + ' GB'
        ];
      }));
    } else {
      pushNone(table, 3);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a list of kernels.
 * @param {Array.<Object>} kernels The list of kernels to display
 */
exports.displayKernels = (kernels) => {
  if (json()) {
    console.log(kernels);
  } else {
    var table = new Table({
      head: ['ID', 'Name', 'Version']
    });
    if (kernels.length > 0) {
      table.push.apply(table, kernels.map((kernel) => {
        return [
          colorID(kernel.id),
          colorName(kernel.name),
          kernel.version
        ];
      }));
    } else {
      pushNone(table, 1);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a message upon completion of an action.
 * @param {string} message The message to display
 */
exports.displayMessage = (message) => {
  if (json()) {
    console.log({ message: message });
  } else {
    console.log(message.red);
  }
};

/**
 * Displays a list of regions.
 * @param {Array.<Object>} regions The list of regions to display
 */
exports.displayRegions = (regions) => {
  if (json()) {
    console.log(regions);
  } else {
    var table = new Table({
      head: ['ID', 'Name', 'Sizes', 'Features', 'Available']
    });
    if (regions.length > 0) {
      regions.sort((a, b) => {
        return a.slug.localeCompare(b.slug);
      });
      table.push.apply(table, regions.map((region) => {
        return [
          colorID(region.slug),
          colorName(region.name),
          defaultJoin(region.sizes),
          defaultJoin(region.features),
          formatStatus(region.available)
        ];
      }));
    } else {
      pushNone(table, 5);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a list of droplet sizes.
 * @param {Array.<Object>} sizes The list of sizes to display
 */
exports.displaySizes = (sizes) => {
  if (json()) {
    console.log(sizes);
  } else {
    var table = new Table({
      head: ['ID', 'Memory', 'VCPUs', 'Disk Space', 'Transfer\nBandwidth',
             'Price/Month']
    });
    if (sizes.length > 0) {
      table.push.apply(table, sizes.map((size) => {
        return [
          colorID(size.slug),
          size.memory + ' MB',
          size.vcpus,
          size.disk + ' GB',
          size.transfer + ' TB',
          '$' + size.price_monthly
        ];
      }));
    } else {
      pushNone(table, 6);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a list of snapshots.
 * @param {Array.<Object>} snapshots The list of snapshots to display
 */
exports.displaySnapshots = (snapshots) => {
  if (json()) {
    console.log(snapshots);
  } else {
    var table = new Table({
      head: ['ID', 'Name', 'Created At']
    });
    if (snapshots.length > 0) {
      table.push.apply(table, snapshots.map((snapshot) => {
        return [
          colorID(snapshot.id),
          colorName(snapshot.name),
          formatDate(snapshot.created_at)
        ];
      }));
    } else {
      pushNone(table, 3);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a single SSH key.
 * @param {Object} key The key to display
 * @param {?boolean=} keyOnly Whether or not to display only the public key
 * @param {?string=} message An optional message to display
 */
exports.displaySshKey = (key, keyOnly, message) => {
  if (json()) {
    console.log(key);
  } else if (keyOnly) {
    console.log(key.public_key);
  } else {
    var table = new Table();
    table.push.apply(table, colorTable([
      ['ID', colorID(key.id)],
      ['Name', colorName(key.name)],
      ['Fingerprint', key.fingerprint],
      ['Public Key', 'Use the --key flag to get the full public key'.red]
    ]));
    if (typeof(message) === 'string') {
      console.log(message.red);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a list of SSH keys.
 * @param {Array.<Object>} keys The list of SSH keys to display
 */
exports.displaySshKeys = (keys) => {
  if (json()) {
    console.log(keys);
  } else {
    var table = new Table({ head: ['ID', 'Name', 'Fingerprint'] });
    if (keys.length > 0) {
      table.push.apply(table, keys.map((key) => {
        return [colorID(key.id), colorName(key.name), key.fingerprint]
      }));
    } else {
      pushNone(table, 3);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a single volume.
 * @param {Object} volume The volume to display
 * @param {?message=} message An optional message to display
 */
exports.displayVolume = (volume, message) => {
  if (json()) {
    console.log(volume);
  } else {
    var table = new Table();
    table.push([{
      colSpan: 2,
      content: 'ID: '.red + colorID(volume.id)
    }]);
    table.push.apply(table, colorTable([
      ['Name', colorName(volume.name)],
      ['Size', volume.size_gigabytes + ' GB'],
      ['Region', volume.region.slug],
      ['Description', formatTextWrap(volume.description, 25)],
      ['Attached To', colorID(defaultJoin(volume.droplet_ids))],
      ['Created At', formatDate(volume.created_at)]
    ]));
    if (typeof(message) === 'string') {
      console.log(message.red);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a list of volumes.
 * @param {Array.<Object>} volumes The list of volumes to display
 */
exports.displayVolumes = (volumes) => {
  if (json()) {
    console.log(volumes);
  } else {
    var table = new Table();
    if (volumes.length > 0) {
      volumes.map((volume) => {
        table.push([{
          colSpan: 2,
          content: 'ID: '.red + colorID(volume.id)
        }]);
        table.push.apply(table, colorTable([
          ['Name', colorName(volume.name)],
          ['Size', volume.size_gigabytes + ' GB'],
          ['Region', volume.region.slug],
          ['Attached to', colorID(defaultJoin(volume.droplet_ids))]
        ]));
      });
    } else {
      pushNone(table, 1);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a single tag.
 * @param {Object} tag The tag to display
 * @param {?message=} message An optional message to display
 */
exports.displayTag = (tag, message) => {
  if (json()) {
    console.log(tag);
  } else {
    var table = new Table();
    table.push.apply(table, colorTable([
      ['Tag', colorName(tag.name)],
      ['Droplets Tagged', tag.resources.droplets.count],
      ['Last Droplet Tagged', colorID(tag.resources.droplets.last_tagged.id)]
    ]));
    if (typeof(message) === 'string') {
      console.log(message.red);
    }
    console.log(table.toString());
  }
};

/**
 * Displays a list of tags
 * @param {Array.<Object>} tags The list of tags to display
 */
exports.displayTags = (tags) => {
  if (json()) {
    console.log(tags);
  } else {
    var table = new Table({
      head: ['Tag', 'Droplets Tagged']
    });
    if (tags.length > 0) {
      table.push.apply(table, tags.map((tag) => {
        return [colorName(tag.name), tag.resources.droplets.count];
      }));
    } else {
      pushNone(table, 2);
    }
    console.log(table.toString());
  }
};
