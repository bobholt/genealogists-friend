'use strict';

// Set production environment options
module.exports = {
  database: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'mydatabaseuser',
      password: 'mysupersecretpassword',
      database: 'mydatabasename',
      charset: 'utf8'
    }
  },
  tableName: 'knex_version',
  app: {
    title: 'Genealogist\'s Friend',
    description: 'An application for serious genealogists to manage sources and assertions'
  }
};
