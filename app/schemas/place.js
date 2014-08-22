// PLACE
//   Type:
//     Dependent.  Requires PLACE-PART-TYPE.
//   Definition:
//     Contains the core information about a PLACE, but does not include the
//     subparts that make up the hierarchical name of a PLACE.
//   Primary Key:
//     Place-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One PLACE has one to many PLACE-PARTs.
//     One PLACE-PART belongs to one PLACE.
//     PLACE also has numerous one to zero-to-many relationships with entities
//     like ASSERTION, GROUP, EVENT, CHARACTERISTIC, RESEARCHER, and REPOSITORY.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('place').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('place', function(table) {

      // Unique key that identifies a place name.
      table.increments('id').primary().unique();

      // A point date or date range describing when this place was in existence.
      table.specificType('existence_date', 'daterange').notNullable();

      // Describes the order of the PLACE-PARTs.
      table.string('ascending_descending_none').notNullable().defaultTo('none');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
