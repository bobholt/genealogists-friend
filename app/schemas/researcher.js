// RESEARCHER
//   Type:
//     Independent.  Data about RESEARCHER can be entered without regard to any
//     other entity.
//   Definition:
//     Information about a genealogical researcher that identifies who is
//     responsible for any particular piece of data in the system.
//   Primary Key:
//     Researcher-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One RESEARCHER participates in zero to many PROJECTs (through
//     RESEARCHER-PROJECT).
//     The data for one PROJECT comes from one to many RESEARCHERs (through
//     RESEARCHER-PROJECT).
//     A RESEARCHER lives in one PLACE.
//     A RESEARCHER performs zero to many SEARCHs.
//     A SEARCH is made by one and only one RESEARCHER.
//     A RESEARCHER makes zero to many ASSERTIONs.
//     An ASSERTION is made by one and only one RESEARCHER.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('researcher').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('researcher', function(table) {

      // Unique identifier for this particular RESEARCHER.
      table.increments('id').primary().unique();

      table.string('givenName').notNullable().defaultTo('');
      table.string('familyName').notNullable().defaultTo('');

      // The full name of the researcher, suitable for reports.
      table.string('displayName').notNullable().defaultTo('');

      table.boolean('familyNameFirst').notNullable().defaultTo(false);

      table.string('email').notNullable().unique();

      table.string('provider').notNullable();
      table.string('password').notNullable();

      // The address of the researcher.  Part of the address is connected to
      // Place-ID in PLACE.
      table.integer('address_id').unsigned().references('id').inTable('place');

      // Comments about the researcher, if necessary.
      table.text('comments').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
