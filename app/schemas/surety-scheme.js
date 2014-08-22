// SURETY-SCHEME
//   Type:
//     Independent.  Requires no other entities.
//   Definition:
//     The scheme used to establish the surety level of assertions made for a
//     particular project.  Different researchers may use different schemes
//     such as “1 to 3” or “1 to 5” or “E, F, P”, and in order to understand
//     the researcher’s evaluations, it is necessary to understand the
//     particular scheme in use. Our standard requires that the scheme sort high
//     as the most reliable.
//   Primary Key:
//     Surety-Scheme-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One SURETY-SCHEME is used in zero to many PROJECTs.
//     One PROJECT uses zero to one SURETY-SCHEMEs.
//     One SURETY-SCHEME has one to many SURETY-SCHEME-PARTs.
//     One SURETY-SCHEME-PART belongs to one SURETY-SCHEME.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('surety-scheme').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('surety-scheme', function(table) {

      // Unique identifier for each surety scheme.
      table.increments('id').primary().unique();

      // The name of the surety scheme.
      table.string('name').notNullable().defaultTo('');

      // A general description of the SURETY-SCHEME, if necessary.
      table.text('description').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
