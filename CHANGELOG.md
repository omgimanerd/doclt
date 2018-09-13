# CHANGELOG

### 1.0.0
  - Project release

### 1.1.0
  - Update README information
  - Digital Ocean token is now stored in config.json

### 1.1.2
  - Reformatted the display of droplet kernels

### 1.3.0
  - Updated code to ES6 style with new .eslintrc
  - Digital Ocean token is stored in ~/.doclt_config.json

### 1.4.0
  - Fixed bug where empty fields in droplet creation would cause a crash

### 1.4.1
  - I was too fucking trigger happy so I broke everything in version 1.4.0
  - Fix breakage when trying to set an access token
  - Fix breakage when Display.format() is called with an empty string

### 1.5.0
  - Implemented certificate subcommand after contributing it upstream

### 2.0.0
  - Implemented firewall subcommands
  - Implemented load balancer subcommands
  - Implemented bash completion
  - Implemented nicer error catching
  - Completed a major refactor to clean up internal utility library
  - Removed dependency on prompt.js, all options are now specified via flags
  - Added unit tests for some functions in the utility library
