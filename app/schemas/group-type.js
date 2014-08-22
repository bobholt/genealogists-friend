// GROUP-TYPE
//   Type:
//     Independent.  Does not require any other entities.
//   Definition:
//     Because many groups (e.g., military groups) have quite similar structures,
//     it’s more efficient to define a type of group in a template structure
//     than to keep defining individual groups that are the same.  The
//     GROUP-TYPE contains the name and the ordering characteristics of a
//     standard group while the details about the standard group appear as
//     individual instances of GROUP-TYPE-ROLE.
//   Primary Key:
//     Group-Type-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One GROUP-TYPE is manifested as zero to many GROUPs.
//     One GROUP is of one and only one GROUP-TYPE.
//     One GROUP-TYPE has one to many GROUP-TYPE-ROLEs.
//     One GROUP-TYPE-ROLE belongs to one and only one GROUP-TYPE.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('group-type').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('group-type', function(table) {

      // Unique key that identifies a specific group type.
      table.increments('id').primary().unique();

      // The name of this group type.  An example might be “U.S.  Army grades
      // and ranks, 1810-1830” (or whatever).  Another group might be “Neighbors
      // Occupying Contiguous Property”
      table.string('name').notNullable().defaultTo('');

      // What is the ordering scheme of this group?
      table.string('ascending_descending_none').notNullable().defaultTo('none');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
