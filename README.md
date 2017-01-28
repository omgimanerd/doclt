# docli
Docli is a command line interface for interacting with Digital Ocean. It
presents information in Terminal in a neat, tidy, and visually appealing way.

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
┌──────────┬─────────────────────────────────┬──────────────┐
│ ID       │ Distribution (PUBLIC) (PRIVATE) │ Minimum Size │
├──────────┼─────────────────────────────────┼──────────────┤
│ 20625985 │ CentOS 5.11 x32                 │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 20625979 │ CentOS 5.11 x64                 │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 22236119 │ CentOS 6.8 x32                  │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 22099398 │ CoreOS 1235.6.0 (stable)        │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 22100001 │ CoreOS 1248.4.0 (beta)          │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 21419789 │ Debian 7.11 x32                 │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 21419458 │ Debian 7.11 x64                 │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 22235142 │ Debian 8.7 x32                  │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 22235108 │ Debian 8.7 x64                  │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 18027532 │ Fedora 24 x64                   │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 21190386 │ Fedora 25 x64                   │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 19103923 │ FreeBSD 10.3                    │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 18818640 │ FreeBSD 10.3 zfs                │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 20199958 │ FreeBSD 11.0                    │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 20199928 │ FreeBSD 11.0 zfs                │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 21399414 │ Ubuntu 14.04.5 x32              │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 21399384 │ Ubuntu 14.04.5 x64              │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 21669479 │ Ubuntu 16.04.1 x32              │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 21669205 │ Ubuntu 16.04.1 x64              │ 20 GB        │
├──────────┼─────────────────────────────────┼──────────────┤
│ 21385718 │ Ubuntu 16.10 x32                │ 20 GB        │
└──────────┴─────────────────────────────────┴──────────────┘
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
  docli.js <command> [arguments..] [options..]

Commands:
  account        Display account information  [aliases: acc]
  domains        Create, delete, and manage domains  [aliases: domain]
  droplets       Create, delete, and manage droplets  [aliases: droplet]
  images         Create, delete, and manage images  [aliases: image]
  regions        Lists the available regions  [aliases: region]
  sizes          Lists the available droplet sizes  [aliases: size]
  ssh            Create, delete, and manage SSH public keys
  tags           Create, delete, and manage tags  [aliases: tag]
  token <token>  Set the DigitalOcean auth token  [aliases: auth, authenticate]
  volumes        Create, delete, and manage volumes  [aliases: volume]

Options:
  --help      Show help  [boolean]
  --json      Output results as JSON  [boolean]
  --no-color  Disable colors  [boolean]
  --color     Invoking this does nothing  [boolean]
  --version   Show version number  [boolean]

See 'docli.js <command> --help' for more info.
```

## Contributing
Open issues to discuss any feature requests or changes that you would like to
make. Fork this repository and push changes to your own fork. Then send me a
pull request.
```
git clone git@github.com/your-username/docli
cd docli
git checkout -b feature-name
# Make changes
git commit
git push origin feature-name
```
After the pull request is accepted, you can fetch those changes back to your
master branch.
```
git remote add upstream git@github.com:omgimanerd/docli
git pull upstream master
```

## Creators
  - Alvin Lin (omgimanerd)
