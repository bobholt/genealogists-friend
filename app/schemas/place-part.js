// PLACE-PART
//   Type:
//     Dependent.  Requires PLACE-PART-TYPE.
//   Definition:
//     Contains information about a specific place, but in a way that the
//     hierarchical relationship of that place to other places is preserved.
//     One instance of PLACE-PART might be Maryland, while another is Virginia.
//     Through association with PLACE-PART-TYPE we would know that both
//     instances are called a “State”.
//     Note that a PLACE-PART like “Montgomery” is part of many different PLACEs.
//     It is a county in several different states, and it is also a city in
//     Alabama.  But each of these Montgomerys would appear as a different
//     instance in PLACE-PART and be attached to a different PLACE as would be
//     expected.
//   Primary Key:
//     (None)
//   Foreign Keys:
//     Place-Part-Type-ID (in PLACE-PART-TYPE)
//     Place-ID (in PLACE)
//   Relationships:
//     An example of one PLACE-PART-TYPE (such as “State”) is found in zero to
//     many actual PLACE-PARTs (such as “Colorado”).
//     One PLACE-PART is of one PLACE-PART-TYPE.
//     One PLACE-PART appears in one PLACE.
//     One PLACE is made up of one to many PLACE-PARTs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('place-part').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('place-part', function(table) {

      // Unique key that identifies the type of place part that this is, e.g.,
      // “State” or “Country” or “County”, etc.
      table.integer('place_part_type_id').unsigned().references('id').inTable('place-part-type').notNullable();

      // Unique key that identifies the PLACE of which this is a part.
      table.integer('place_id').unsigned().references('id').inTable('place').notNullable();

      // The actual name of this place part, such as “Prince George’s”.
      table.string('name').notNullable().defaultTo('');

      // The number that keeps the PLACE-PARTs in order, either ascending or
      // descending (or in no order).
      table.integer('sequence_number').unsigned().notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
