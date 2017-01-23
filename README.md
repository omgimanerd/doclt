# docli
Docli is a command line interface for interacting with Digital Ocean. It will
present information in Terminal in a neat and tidy way.

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
┌──────────┬─────────────────────────────────┬──────────┐
│ ID       │ Distribution (PUBLIC) (PRIVATE) │ Min Size │
├──────────┼─────────────────────────────────┼──────────┤
│ 20625985 │ CentOS 5.11 x32                 │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 20625979 │ CentOS 5.11 x64                 │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21398913 │ CentOS 6.8 x32                  │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21398492 │ CentOS 6.8 x64                  │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21419098 │ CentOS 7.2.1511 x64             │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 22100001 │ CoreOS 1248.4.0 (beta)          │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 18027532 │ Fedora 24 x64                   │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21190386 │ Fedora 25 x64                   │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 10144573 │ FreeBSD 10.1                    │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 18848244 │ FreeBSD 10.2                    │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 19103923 │ FreeBSD 10.3                    │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 18818640 │ FreeBSD 10.3 zfs                │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 20199958 │ FreeBSD 11.0                    │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 20199928 │ FreeBSD 11.0 zfs                │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21250276 │ Ubuntu 12.04.5 x32              │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21252950 │ Ubuntu 12.04.5 x64              │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21399414 │ Ubuntu 14.04.5 x32              │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21399384 │ Ubuntu 14.04.5 x64              │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21385718 │ Ubuntu 16.10 x32                │ 20 GB    │
├──────────┼─────────────────────────────────┼──────────┤
│ 21385117 │ Ubuntu 16.10 x64                │ 20 GB    │
└──────────┴─────────────────────────────────┴──────────┘
```

## Installation
Docli is built with node.js and released on npm. It should work with any
version above 4.3.2. Install it via npm.
```
npm install -g docli
```
Simple as that. You can also clone this GitHub repository and create a symlink
to docli.js if you want, but that's just extra effort.

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
  docli.js <command> [arguments..] [options..]

Commands:
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
  --json      Output results as JSON
  --no-color  Disable colors
  --version   Show version number  [boolean]

See 'docli.js <command> --help' for more info.
```

## Contributing
Fork this repository and push changes to your own fork. Then send me a pull
request. You should probably open an issue and discuss it with me before you
do anything though.

## Creators
  - Alvin Lin (omgimanerd)
