# docli
Docli is a command line interface for interacting with Digital Ocean. It will
present information in Terminal in a neat, tidy, and visually appealing way.

## Installation
Docli is built with node.js and released on npm. It should work with any
version above 4.3.2. Install it via npm.
```
npm install -g docli
```
Simple as that.

If you want to build from source, you can clone this GitHub repository and
create a symlink to docli.js.

## Examples
Listing droplets:
```
$ docli droplets list --no-color
┌────────────┬──────────────┬────────────────┬────────┐
│ Droplet ID │ Droplet Name │ IPv4           │ Status │
├────────────┼──────────────┼────────────────┼────────┤
│ 13280097   │ omgimanerd   │ 45.55.193.57   │ active │
├────────────┼──────────────┼────────────────┼────────┤
│ 32055059   │ eccfinancing │ 138.197.28.147 │ active │
├────────────┼──────────────┼────────────────┼────────┤
│ 37354192   │ test         │ 198.199.67.203 │ off    │
└────────────┴──────────────┴────────────────┴────────┘
```
Listing image types:
```
$ docli images list --distribution --no-color
┌──────────┬──────────────────────────┬──────────────┬─────────────────────────┐
│ ID       │ Name                     │ Minimum Size │ Created At              │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 20625985 │ CentOS 5.11 x32          │ 20 GB        │ 10/31/2016, 1:27:47 PM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 20625979 │ CentOS 5.11 x64          │ 20 GB        │ 10/31/2016, 1:27:26 PM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 22236119 │ CentOS 6.8 x32           │ 20 GB        │ 1/17/2017, 12:11:22 PM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 22099398 │ CoreOS 1235.6.0 (stable) │ 20 GB        │ 1/10/2017, 10:06:26 PM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 22100001 │ CoreOS 1248.4.0 (beta)   │ 20 GB        │ 1/10/2017, 10:26:27 PM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 21419789 │ Debian 7.11 x32          │ 20 GB        │ 12/9/2016, 11:19:04 AM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 21419458 │ Debian 7.11 x64          │ 20 GB        │ 12/9/2016, 10:22:42 AM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 22235142 │ Debian 8.7 x32           │ 20 GB        │ 1/17/2017, 9:10:26 AM   │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 22235108 │ Debian 8.7 x64           │ 20 GB        │ 1/17/2017, 9:03:16 AM   │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 18027532 │ Fedora 24 x64            │ 20 GB        │ 6/21/2016, 6:36:10 PM   │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 21190386 │ Fedora 25 x64            │ 20 GB        │ 11/28/2016, 9:06:44 AM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 19103923 │ FreeBSD 10.3             │ 20 GB        │ 8/16/2016, 3:11:09 PM   │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 18818640 │ FreeBSD 10.3 zfs         │ 20 GB        │ 8/1/2016, 10:42:12 PM   │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 20199958 │ FreeBSD 11.0             │ 20 GB        │ 10/10/2016, 12:23:13 PM │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 20199928 │ FreeBSD 11.0 zfs         │ 20 GB        │ 10/10/2016, 12:17:29 PM │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 21399414 │ Ubuntu 14.04.5 x32       │ 20 GB        │ 12/8/2016, 12:52:42 PM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 21399384 │ Ubuntu 14.04.5 x64       │ 20 GB        │ 12/8/2016, 12:47:32 PM  │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 21669479 │ Ubuntu 16.04.1 x32       │ 20 GB        │ 12/21/2016, 11:56:09 AM │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 21669205 │ Ubuntu 16.04.1 x64       │ 20 GB        │ 12/21/2016, 11:06:27 AM │
├──────────┼──────────────────────────┼──────────────┼─────────────────────────┤
│ 21385718 │ Ubuntu 16.10 x32         │ 20 GB        │ 12/7/2016, 7:36:11 PM   │
└──────────┴──────────────────────────┴──────────────┴─────────────────────────┘
```

## Usage
Before using docli, you must set your
[Digital Ocean auth token](https://cloud.digitalocean.com/settings/api/tokens).
Get one from Digital Ocean and run:
```
docli token <YOUR TOKEN HERE>
# Example: docli token abcdefghijk1234567890
```

Every command is documented by the tool itself. Run `docli <command> --help`
for details about using any command.
```
Usage:
  docli.js <command> [arguments..] [options..]

Commands:
  account        Display account information  [aliases: acc]
  domains        Create, delete, and manage domains  [aliases: domain]
  droplets       Create, delete, and manage droplets  [aliases: droplet]
  images         Create, delete, and manage images  [aliases: image]
  regions        Lists the available regions  [aliases: region]
  sizes          Lists the available droplet sizes  [aliases: size]
  snapshots      Create, delete, and manage snapshots  [aliases: snapshot]
  ssh            Create, delete, and manage SSH public keys
  token <token>  Set the DigitalOcean auth token  [aliases: auth, authenticate]
  volumes        Create, delete, and manage volumes  [aliases: volume]

Options:
  --help      Show help  [boolean]
  --json      Output results as JSON  [boolean]
  --no-color  Disable colors  [boolean]
  --color     Invoking this does nothing
  --version   Show version number  [boolean]

  See 'docli.js <command> --help' for more info.
```

## Contributing
Fork this repository and push changes to your own fork. Then send me a pull
request. You should probably open an issue and discuss it with me before you
do anything though.

## Creators
  - Alvin Lin (omgimanerd)
