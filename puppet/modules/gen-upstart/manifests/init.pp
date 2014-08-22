class gen-upstart {

  # Copy upstart configuration into /etc/init
  exec { 'copy upstart conf':
    command => 'cp /var/local/sites/genealogy/deploy/init/genealogy.conf /etc/init/genealogy.conf',
  }

  # Stop course creator if running
  exec { 'stop genealogy':
    require => [ Exec[ 'npm install' ], Exec[ 'copy upstart conf' ] ],
    onlyif => 'initctl status genealogy | grep -q running',
  }

  # Start course creator if stopped
  exec { 'start genealogy':
    require => [ Exec[ 'npm install' ], Exec[ 'copy upstart conf' ], Exec[ 'stop genealogy' ] ],
    unless => 'initctl status genealogy | grep -q running',
  }
}
