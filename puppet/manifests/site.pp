# Set execution path for exec directives
Exec { path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/", "/opt/node/bin" ] }

# Before anything, copy the app directory to /var/local/sites/genealogy
exec { 'copy site':
  command => 'rm -rf /var/local/sites && mkdir /var/local/sites && cp -r /vagrant /var/local/sites && mv /var/local/sites/vagrant /var/local/sites/genealogy',
  before => [ Class[ 'gen-nginx' ], Class[ 'gen-node' ], Class[ 'gen-postgres' ], Class[ 'gen-upstart' ] ],
}

# Install curl - required by gen-node
include gen-curl

# Install and configure nginx
include gen-nginx

# Install and configure postgres
include gen-postgres

# Install and configure node
include gen-node

# Configure upstart and start node process
include gen-upstart
