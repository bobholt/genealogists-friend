class gen-curl {

  ## Update apt
  exec { 'apt-update-curl':
    command => 'apt-get update',
  }

  ## Install curl
  package { 'curl':
    require => Exec[ 'apt-update-curl' ],
    ensure => installed,
  }

}
