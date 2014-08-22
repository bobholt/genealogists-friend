// CITATION-PART-TYPE
//   Type:
//     Independent.  Data about CITATION-PART-TYPE can be entered without regard
//     to any other entity.
//   Definition:
//     Contains a list of citation parts, the names of the pieces of data found
//     in citations of all types, such as author, editor, title, and place of
//     publication.  Note that this entity does not contain the actual citation
//     values such as “Baltimore”.
//   Primary Key:
//     Citation-Part-Type-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One CITATION-PART-TYPE can be found in zero to many CITATION-PARTs.
//     One CITATION-PART belongs to one and only one CITATION-PART-TYPE.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('citation-part-type').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('citation-part-type', function(table) {

      // Unique identifier for this particular CITATION-PART.
      table.increments('id').primary().unique();

      // The actual name of the citation part, such as author, compiler, editor,
      // transcriber, or place of publication.  There are more than a hundred
      // different citation parts.
      table.string('name').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});

