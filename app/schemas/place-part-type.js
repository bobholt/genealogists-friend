// PLACE-PART-TYPE
//   Type:
//     Independent.  Does not require any other entities.
//   Definition:
//     Contains information about various schemes of organizing place data in a
//     hierarchical or other fashion.  Parts might include “Country”, “State”,
//     “Province”, “County”, and “City/Town/Village”.
//   Primary Key:
//     Place-Part-Type-ID
//   Foreign Keys:
//     (None)
//   Relationships:
//     One PLACE-PART-TYPE has zero to many PLACE-PARTs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('place-part-type').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('place-part-type', function(table) {

      // Unique key that identifies the PLACE-PART-TYPE.
      table.increments('id').primary().unique();

      // The name of this PLACE-PART-TYPE, such as “State”, “County”, “Country”, “Ocean”, or “Hospital”.
      table.string('name').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
