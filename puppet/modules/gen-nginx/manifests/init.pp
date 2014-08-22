class gen-nginx {

  ## Update apt
  exec { 'apt-update-nginx':
    command => 'apt-get update',
  }

  # Install nginx if not already installed
  package { 'nginx':
    require => Exec[ 'apt-update-nginx' ],
    ensure => installed,
  }

  # Start nginx if not already running
  service { 'nginx':
    require => Package[ 'nginx' ],
    ensure => running,
    enable => true,
  }

  # Move the nginx conf to sites-available
  exec { 'move conf':
    command => 'cp /var/local/sites/genealogy/deploy/nginx/nginx.conf /etc/nginx/sites-available/genealogy.conf',
    require => Service[ 'nginx' ],
    cwd => '/var/local/sites/genealogy',
    before => Exec[ 'restart nginx' ],
  }

  # Symlink into sites-enabled
  exec { 'link conf':
    require => Exec[ 'move conf' ],
    command => 'ln -s /etc/nginx/sites-available/genealogy.conf /etc/nginx/sites-enabled/genealogy.conf',
    before => Exec[ 'restart nginx' ],
    unless => 'test -h /etc/nginx/sites-enabled/genealogy.conf',
  }

  # Remove default nginx config
  exec { 'remove default':
    require => Service[ 'nginx' ],
    command => 'rm /etc/nginx/sites-enabled/default && rm /etc/nginx/sites-available/default',
    before => Exec[ 'restart nginx' ],
    onlyif => 'test -e /etc/nginx/sites-enabled/default && test -e /etc/nginx/sites-available/default',
  }

  # Restart nginx
  exec { 'restart nginx':
    command => 'service nginx restart',
  }

}
