// PERSONA
//   Type:
//     Dependent.  Requires ASSERTIONs to support the data.
//   Definition:
//     Contains the core identification for each individual in genealogical
//     data, and allows information about similarly named or identically named
//     people to be brought together, after suitable analysis, in the same
//     aggregate individual.  Because real human beings leave data tracks
//     through time as if they were disparate shadow personas, this entity
//     allows the genealogical researcher to tie together data from different
//     personas that he or she believes belong to the same real person.  The
//     mechanism for this, discussed in the text, is to make different PERSONAs
//     part of the same GROUP.
//   Primary Key:
//     Persona-ID
//   Foreign Keys:
//     None
//   Relationships:
//     One PERSONA is based on one ASSERTION.  However, note that an ASSERTION
//     may link one PERSONA to a GROUP, and thus many separate PERSONAs can be
//     brought together into a higher level constructed PERSONA.
//     One ASSERTION can describe zero or one PERSONAs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('persona').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('persona', function(table) {

      // Unique key identifying a single PERSONA.
      table.increments('id').primary().unique();

      // The entire name that this PERSONA is known by.  This can be a special
      // instance from a single record (from SOURCE and REPRESENTATION) like
      // “John Q. Smith”, or it can be a composite name built up from many
      // separate instances, such as “John Quincy (Butch) Smith”, that never
      // actually appear in any record, but which reflects the name the way
      // the RESEARCHER wishes to tag the individual.
      table.string('name').notNullable().defaultTo('');

      // Any narrative necessary to distinguish this person.
      table.text('comments').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
