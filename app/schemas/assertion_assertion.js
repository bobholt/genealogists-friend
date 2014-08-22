// ASSERTION-ASSERTION
//   Type:
//     Dependent.  Requires ASSERTION  twice (where it feeds multiple ASSERTIONs
//     into a new ASSERTION).
//   Definition:
//     An associative entity that links ASSERTION to itself so that multiple
//     prior ASSERTIONs be brought together into a new ASSERTION.  As an
//     example, four ASSERTIONs based on individual SOURCEs can be brought
//     together to resolve or document discrepancies about the date of a
//     person’s birth.
//   Primary Key:
//     None
//   Foreign Keys:
//     Assertion-ID-Low (in ASSERTION)
//     Assertion-ID-High (in ASSERTION)
//   Relationships:
//     An ASSERTION-ASSERTION has one input ASSERTION.
//     An ASSERTION-ASSERTION has one output ASSERTION.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('assertion_assertion').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('assertion_assertion', function(table) {

      // The unique key in ASSERTION for which this instance (i.e., a physical
      // record in a table) serves as the input.
      table.integer('assertion_low_id').unsigned().references('id').inTable('assertion').notNullable();

      // The unique key in ASSERTION for which this instance (i.e., a physical
      // record in a table) serves as the output.
      table.integer('assertion_high_id').unsigned().references('id').inTable('assertion').notNullable();

      // A value that keeps a series of input and output ASSERTIONs in order, so
      // that for example, 4 lower level ASSSERTIONs can be brought together
      // into a higher level ASSERTION with the order of the low level
      // ASSERTIONs preserved.
      table.integer('sequence_number').unsigned().notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
