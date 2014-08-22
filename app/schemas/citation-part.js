// CITATION-PART
//   Type:
//     Dependent.  Requires CITATION-PART-TYPE and SOURCE.
//   Definition:
//     Provides a place to store the actual citation part for a particular
//     SOURCE, such as author, title, and publication place  (in
//     Citation-Part-Value).  There are a large number of CITATION-PART-TYPEs
//     since there are a large number of types of genealogical records.
//   Primary Key:
//     None
//   Foreign Keys:
//     Source-ID (in SOURCE)
//     Citation-Part-Type-ID (in CITATION-PART-TYPE)
//   Relationships:
//     One CITATION-PART-TYPE appears in zero to many CITATION-PARTs, e.g.,
//       there are a lot of citations for different authors.
//     One CITATION-PART is of one and only one CITATION-PART-TYPE.
//     One SOURCE can have zero to many CITATION-PARTs, e.g., a particular
//       SOURCE might have an author, an editor, a compiler, a translator, a
//       place of publication, and many other citation parts.
//     One CITATION-PART refers to only one SOURCE.  For example, “Baltimore”
//     refers to the place of publication for a single SOURCE; if another SOURCE
//     was also published in Baltimore, there would be another instance in
//     CITATION-PART.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('citation-part').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('citation-part', function(table) {

      // The unique key in SOURCE for which this is a citation part.
      table.integer('source_id').unsigned().references('id').inTable('source').notNullable();

      // The unique key in CITATION-PART-TYPE that identifies the type of
      // citation part that this is, such as “Publication City”, “Author”, or
      // “Title”.  Note that this is merely the ID and not the actual words.
      table.integer('citation_part_type_id').unsigned().references('id').inTable('citation-part-type').notNullable();

      // The actual value of this citation part, such as “Baltimore”, “Thomas
      // Smith”, or “Wills of Prince George’s County, Maryland 1695-1710”
      table.string('citation_part_value').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});


