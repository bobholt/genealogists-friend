// REPOSITORY
//   Type:
//     Independent.  Requires no other entities.
//   Definition:
//     Contains information about the place where data is found.  While this
//     typically would be information about a library or archives, it can also
//     be information about a private citizen who holds genealogical material of
//     interest, such as a diary, family bible, and so forth.  Data in this
//     entity is sometimes part of a citation; it is required if the reader of
//     the output of the data must know specifically where to find the data.
//   Primary Key:
//     Repository-ID
//   Foreign Keys:
//     Place-ID (in PLACE)
//   Relationships:
//     One REPOSITORY exists in one PLACE.
//     One PLACE has zero to many REPOSITORYs.
//     One REPOSITORY has zero to many SOURCEs (through REPOSITORY-SOURCE).
//     One SOURCE is found in zero to many REPOSITORYs.  (The zero condition is
//     when we have data about a SOURCE but do not know where it can be found.)

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('repository').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('repository', function(table) {

      // Unique key that identifies the specific REPOSITORY.
      table.increments('id').primary().unique();

      // Unique key that identifies the specific PLACE that this REPOSITORY is
      // located.
      table.integer('place_id').unsigned().references('id').inTable('place').notNullable();

      // The full name of the REPOSITORY.  If it is an individual instead of an
      // institution, substitute the individual’s data throughout.
      table.string('name').notNullable().defaultTo('');

      // The address of the REPOSITORY.
      table.string('address').notNullable().defaultTo('');

      // The phone number of the REPOSITORY.
      table.string('phone').notNullable().defaultTo('');

      // The hours that the REPOSITORY is open to the public.
      table.string('hours').notNullable().defaultTo('');

      // Any pertinent comments about the repository, such as the need to obtain
      // a researcher’s card, restrictions on the use of laptops, etc.
      table.text('comments').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
