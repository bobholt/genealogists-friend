// CHARACTERISTIC
//   Type:
//     Dependent.  Requires ASSERTION and CHARACTERISTIC-PART.
//   Definition:
//     A CHARACTERISTIC is any data that distinguishes one person from another,
//     such as an occupation, hair color, religion, name, and so forth.  Most
//     CHARACTERISTIC data consists of a single part value, but some data can be
//     more complex and require the sequencing of many parts such as a person’s
//     name.
//   Primary Key:
//     Characteristic-ID
//   Foreign Keys:
//     Place-ID (in PLACE)
//   Relationships:
//     One CHARACTERISTIC has one to many CHARACTERISTIC-PARTs.
//     One CHARACTERISTIC-PART is part of only one CHARACTERISTIC.
//     One CHARACTERISTIC is the subject of one ASSERTION.
//     One ASSERTION describes zero to two CHARACTERISTICs.
//     One CHARACTERISTIC happens in one PLACE.
//     One PLACE can be the location of zero to many CHARACTERISTICs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('characteristic').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('characteristic', function(table) {

      // Unique identifier that indicates which characteristic this is.
      table.increments('id').primary().unique();

      // Unique identifier in PLACE that indicates the place associated with
      // this CHARACTERISTIC.  Note that this is not a characteristic of a place
      // (such as “nice view of the mountains”), but a place where a
      // characteristic was noted, e.g., “Tuscon” is the place where John Smith
      // was employed as a stagecoach driver, a type of occupation and thus a
      // characteristic of John Smith.
      table.integer('place_id').unsigned().references('id').inTable('place').notNullable();

      // The date associated with the CHARACTERISTIC.  This can be a point date
      // (e.g., a specific day, week, month, or year) or it can be a date range.
      table.specificType('date', 'daterange').notNullable();

      // The sorting order of the attached CHARACTERISTIC-PARTs.
      table.string('ascending_descending_none').notNullable().defaultTo('none');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});

