// REPRESENTATION
//   Type:
//     Dependent.  Requires SOURCE and REPRESENTATION-TYPE.
//   Definition:
//     Contains the representation of a SOURCE in a variety of multimedia
//     formats as needed, including old fashioned text, plus it contains a
//     pointer to a physical file if the representation cannot be stored within
//     the data model.
//   Primary Key:
//     None
//   Foreign Keys:
//     Source-ID (in SOURCE)
//     Representation-Type-ID (in REPRESENTATION-TYPE)
//   Relationships:
//     One REPRESENTATION is a manifestation of one SOURCE.
//     One SOURCE has zero to many REPRESENTATIONs.  The zero condition is
//     useful for a SOURCE in which the researcher found nothing.  The SEARCH in
//     the SOURCE was significant and was recorded, but there is no
//     REPRESENTATION, i.e., no photocopy, no text extract, no photo.
//     One REPRESENTATION is of one REPRESENTATION-TYPE.
//     One REPRESENTATION-TYPE is manifested in zero to many REPRESENTATIONs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('representation').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('representation', function(table) {

      // Unique key that identifies the specific SOURCE.
      table.integer('source_id').unsigned().references('id').inTable('source').notNullable();

      // Unique key that identifies the type of representation, such as text,
      // TIF bitmap, or other type.
      table.integer('representation_type_id').unsigned().references('id').inTable('representation-type').notNullable();

      // If the REPRESENTATION is external to the data model, such as a stored
      // photograph that is not scanned into a computer system, this code tells
      // the researcher where the REPRESENTATION is physically filed or stored.
      table.string('physical_file_code').notNullable().defaultTo('');

      // Often the SOURCE medium is paper, but it can be electronic, stone in
      // the case of a tombstone, or other exotic media.
      table.string('medium').notNullable().defaultTo('');

      // The actual content of the REPRESENTATION.  This can be text in the case
      // of an abstract, extract, or transcription, or it can be other
      // REPRESENTATIONs that can be stored within the confines of the actual
      // implementation of the logical data model such as a bitmap that is
      // stored in a computer application, or a sound file.  If the content
      // cannot be stored in the model, this is empty.  An example would be a
      // physical artifact like a souvenir glass from the World’s Fair with the
      // bride and groom’s name and the marriage date; clearly we cannot store
      // this electronically, but we could store a photograph of it
      // electronically.
      table.text('content').notNullable().defaultTo('');

      // Any comments that are required to describe this REPRESENTATION.
      table.text('comments').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
