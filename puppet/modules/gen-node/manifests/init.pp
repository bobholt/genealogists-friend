class gen-node {

  # Download node binary - apt is out-of-date
  exec { 'download-node':
    cwd => '/opt',
    command => 'curl -O http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz',
    require => Class[ 'gen-curl' ],
  }

  # Unpack binary
  exec { 'unpack-node':
    cwd => '/opt',
    command => 'tar -zxvf node-v0.10.30-linux-x64.tar.gz',
    require => Exec[ 'download-node' ],
  }

  # Rename it to `node`
  exec { 'rename-node':
    cwd => '/opt',
    command => 'mv node-v0.10.30-linux-x64 node',
    require => Exec[ 'unpack-node' ],
    unless => 'test -d node',
  }

  # Link node and npm into /usr/bin
  exec { 'link-node':
    require => Exec[ 'rename-node' ],
    command => 'ln -s /opt/node/bin/node /usr/bin/node && ln -s /opt/node/bin/npm /usr/bin/npm',
    unless => 'test -h /usr/bin/node && test -h /usr/bin/npm',
  }

  # NPM install
  exec { 'npm install':
    require => Exec[ 'link-node' ],
    cwd => '/var/local/sites/genealogy',
  }

}
