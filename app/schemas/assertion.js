// ASSERTION
//   Type:
//     Dependent.  Requires numerous other entities including RESEARCHER, the
//     GROUP entities,  PERSONA, the EVENT entities, CHARACTERISTIC, and SURETY.
//   Definition:
//     Contains the lowest level raw conclusional data in a special atomic form.
//     This involves an interpretation by the researcher ranging from trivial
//     to complex.  This entity also contains higher level conclusional data
//     from lower level assertions, so that all assertions can be tracked
//     through layers of reasoning back to their original evidential statement
//     forms.  Assertions should not be deleted, but an attribute (Disproved)
//     exists to nullify erroneous conclusions so that the erroneous reasoning
//     can be preserved and marked as believed to be no longer valid.
//     Everyone’s work has value, even if it is later proved to be wrong.
//     Since all assertions are tagged according to their origin, it is possible
//     to store other’s assertions as well and identify that data as such.
//     While most assertions are tied to particular SOURCE excerpts (the Content
//     attribute in REPRESENTATION) or previous assertions, an assertion can
//     apply to an entire SOURCE.
//   Primary Key:
//     Assertion-ID
//   Foreign Keys:
//     Surety-Scheme-Part-ID (in SURETY-SCHEME-PART)
//     Researcher-ID (in RESEARCHER)
//     Source-ID (in SOURCE)
//   Relationships:
//     Each ASSERTION has data about zero to one PLACE.
//     Each ASSERTION was written by one RESEARCHER.
//     Each ASSSERTION is about two subjects, and each subject is one of the
//       following:  PERSONA, EVENT, CHARACTERISTIC, or GROUP.
//     Some ASSERTIONs are related to either GROUP-TYPE-ROLE or EVENT-TYPE-ROLE
//       (through the Value attribute).
//     Each ASSERTION depends on zero to one SURETY-SCHEME-PARTs.
//     Each ASSERTION is the direct output of no more than one SOURCE.  Some
//       ASSERTIONs are not the direct output of any SOURCE, but are the output
//         of one to many other ASSERTIONs (through ASSERTION-ASSERTION); note
//         that many lower level ASSERTIONs are coupled to one higher level
//         ASSERTION by pairing one at a time through ASSERTION-ASSERTION.
//
// ASSERTIONs can be created in two ways.
//
// * By converting a SOURCE fragment into an ASSERTION, placing it in the
//   general statement form derived from our Super Statement form.  Each SOURCE
//   can give rise to one or more ASSERTIONs, but each ASSERTION created this
//   way derives from one and only one SOURCE fragment.
// * By making an ASSERTION based on one or more existing ASSERTIONs.
//
// The power of the ASSERTION entity is that the fragments of evidence that are
// gathered in SOURCE are then used directly to build low level conclusions.
// Higher level conclusions are in turn built from lower level ASSERTIONs as
// needed, thus giving a complete audit trail that shows why an ASSERTION (a
// conclusion) was made.
//
// The data model also accommodates a negative ASSERTION, a statement that
// something is not the case.  An example of this is the following statement,
// “Cpl. Smith was wounded in a skirmish prior to the Battle of Gettysburg and
// did not participate in that fight.”  The discussion of this is somewhat
// complex; the usefulness of the concept to genealogical researchers depends on
// whether significant negative information is available.   Many other parts of
// the model support negative information as well.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('assertion').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('assertion', function(table) {

      // A unique code that identifies each assertion.
      table.increments('id').primary().unique();

      // A pointer that indicates how sure the researcher is of this particular
      // assertion.
      table.integer('surety_scheme_part_id').unsigned().references('id').inTable('surety-scheme-part').notNullable();

      // A pointer that identifies the researcher who made this assertion.  The
      // person asserting can be the researcher, or a compiler from which the
      // researcher obtained data.  In group projects, there may be many researchers.
      table.integer('researcher_id').unsigned().references('id').inTable('researcher').notNullable();

      // A pointer to the source that gave rise to this assertion, if the
      // assertion is the result of a direct source and not another assertion.
      table.integer('source_id').unsigned().references('id').inTable('source').notNullable();

      // Can be either PERSONA, EVENT, CHARACTERISTIC, or GROUP.
      table.string('subject_1_type').notNullable().defaultTo('');

      // A pointer to the appropriate PERSONA, EVENT, CHARACTERISTIC, or GROUP
      // attribute of ID.
      table.integer('subject_1_id').unsigned().notNullable();

      // Can be either PERSONA, EVENT, CHARACTERISTIC, or GROUP.
      table.string('subject_2_type').notNullable().defaultTo('');

      // A pointer to the appropriate PERSONA, EVENT, CHARACTERISTIC, or GROUP
      // attribute of ID.
      table.integer('subject_2_id').unsigned().notNullable();

      // (Role) If the statement is of the appropriate type, the value of the
      // object in the statement.  Example:  (hair color) red; (occupation)
      // teamster; (sex) female.  In some instances, value can be thought of as
      // “Role” such as “Groom” or “Witness”.
      table.integer('value_id').unsigned().notNullable();
      table.string('value_type').notNullable().defaultTo('');

      // Narrative that explains the researcher’s basis for the assertion.  This
      // can be curt for simple or trivial assertions, or very extensive if
      // necessary for more complex assertions created from a variety of
      // conflicting sources.
      table.text('rationale').notNullable().defaultTo('');

      // A yes/no indicator that the genealogist no longer believes the
      // assertion to be true.  “Yes” or “true” means it is no longer true.
      table.boolean('disproved').notNullable().defaultTo(false);

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
