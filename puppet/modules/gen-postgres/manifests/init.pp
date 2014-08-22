class gen-postgres {

  # Update apt
  exec { 'apt-update-postgres':
    command => 'apt-get update',
  }

  # Install postgres if not already installed
  package { 'postgresql':
    require => Exec[ 'apt-update-postgres' ],
    ensure => installed,
  }

  # Start postgres if not already running
  service { 'postgresql':
    require => Package[ 'postgresql' ],
    ensure => running,
    enable => true,
  }

  # Add genealogy user
  exec { 'add postgres user':
    require => Service[ 'postgresql' ],
    command => 'createuser genealogy -D -R -S',
    user => 'postgres',
    unless => 'psql postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname=\'genealogy\'" | grep -q 1',
  }

  # Change genealogy password
  exec { 'change postgres password':
    command => 'psql -U postgres -c "alter user genealogy with password \'4zRWUi8PO9kH\';"',
    require => Exec[ 'add postgres user'],
    user => 'postgres',
  }

  # Create empty genealogy db
  exec { 'create postgres database':
    command => 'createdb -O genealogy genealogy',
    require => Exec[ 'add postgres user'],
    user => 'postgres',
    unless => 'psql -l | grep genealogy | wc -l | grep -q 1',
  }

  # Restore sql dump
 exec { 'restore postgres database':
   command => 'psql genealogy < /var/local/sites/gnealogy/deploy/sql/genealogy.sql.dump',
   require => Exec[ 'create postgres database' ],
   user => 'postgres',
   cwd => '/var/local/sites/genealogy',
   unless => 'psql -U postgres -d genealogy -tAc "SELECT EXISTS( SELECT * FROM information_schema.tables WHERE table_name = \'activity\');" | grep -q t',
 }
}
