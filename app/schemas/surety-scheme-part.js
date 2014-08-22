// SURETY-SCHEME-PART
//   Type:
//     Dependent.  Requires SURETY-SCHEME.
//   Definition:
//     Contains information about the individual parts of the SURETY-SCHEME.
//     For example, if the scheme is simply 1 to 5, then this entity lists the
//     5 levels and no further information may be required, other than a
//     sequencer to determine what order the parts are in.  However, the
//     RESEARCHER may (and really should) choose to more fully explain what each
//     surety level means.
//   Primary Key:
//     Surety-Scheme-Part-ID
//   Foreign Keys:
//     Surety-Scheme-ID
//   Relationships:
//     One SURETY-SCHEME-PART is part of one SURETY-SCHEME.
//     One SURETY-SCHEME has one to many SURETY-SCHEME-PARTs.  The one condition
//     is unusual, but is useful if a researcher chooses to treat all evidence
//     as the same surety level.
//     One SURETY-SCHEME-PART describes zero to many ASSERTIONs.
//     One ASSERTION is categorized by zero to one SURETY-SCHEME-PARTs.  Note
//     that in this model the RESEARCHER assigns surety levels to the ASSERTIONs
//     made from the direct evidence, not to the evidence itself, but
//     functionally this amounts to the same thing since the ASSERTIONs are
//     closely coupled to the various levels of SOURCE.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('surety-scheme-part').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('surety-scheme-part', function(table) {

      // Unique identifier that indicates which SURETY-SCHEME-PART this is.
      table.increments('id').primary().unique();

      // Unique identifier that determines to what SURETY-SCHEME this part belongs.
      table.integer('surety_scheme_id').unsigned().references('id').inTable('surety-scheme').notNullable();

      // The name of the SURETY-SCHEME-PART such as “1” or “G”.
      table.string('name').notNullable().defaultTo('');

      // An explanation of what the SURETY-SCHEME-PART means.  If “2” in one scheme or “G” in another stands for “Good”, for example, how does the RESEARCHER define “good”?  What kinds of data would routinely be assigned a level of “good” instead of some other category?
      table.text('description').notNullable().defaultTo('');

      // An alphanumeric sequencer that sorts the most reliable SURETY-SCHEME-PART high. For example, if “1, 2, 3” is used by one researcher, and “1” is the most sure, then the corresponding ranks might also be 1, 2, and 3.  If another researcher uses the same “1, 2, 3” but 3 is the most sure, then the corresponding ranks might be C, B, and A to force the list to come out 3, 2, 1.
      table.integer('sequence_number').unsigned().notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
