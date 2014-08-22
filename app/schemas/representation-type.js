// REPRESENTATION-TYPE
//   Type:
//     Independent.
//   Definition:
//     Contains a list of the types of representations of evidence, such as
//     text, a TIF bitmap, a GIF bitmap, a WAV file, or other forms.
//   Primary Key:
//     Representation-Type-ID
//   Foreign Keys:
//     None.
//   Relationships:
//     One REPRESENTATION-TYPE describes zero to many REPRESENTATIONs.
//     One REPRESENTATION is of one REPRESENTATION-TYPE.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('representation-type').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('representation-type', function(table) {

      // Unique key that identifies the specific REPRESENTATION-TYPE.
      table.increments('id').primary().unique();

      // The name of the REPRESENTATION-TYPE such as “Text”, “PCX Bitmap”, and
      // so forth.
      table.string('name').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
