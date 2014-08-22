// CHARACTERISTIC-PART-TYPE
//   Type:
//     Independent.
//   Definition:
//     In the case of most characteristics, this entity provides a list of the
//     one and only part, such as “Occupation”, “Hair Color”, “Medical
//     Condition”, and so forth.  In the case of personal names, however, this
//     entity provides a list of all the name parts such as “Given Name”,
//     “Surname”, “Mononame”, “Prefix”, and so forth.
//   Primary Key:
//     Characteristic-Part-Type-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One CHARACTERISTIC-PART-TYPE is manifested as zero to many
//       CHARACTERISTIC-PARTs.
//     One CHARACTERISTIC-PART is of exactly one CHARACTERISTIC-PART-TYPE.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('characteristic-part-type').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('characteristic-part-type', function(table) {

      // Unique key that identifies each member of the CHARACTERISTIC-PART-TYPE.
      table.increments('id').primary().unique();

      // The actual name of the CHARACTERISTIC-PART-TYPE, such as “Mononame”,
      // “Nickname”, or “Occupation”.
      table.string('name').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});

