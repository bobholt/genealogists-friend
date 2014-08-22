// SOURCE
//   Type:
//     Independent.  Does not require any other entities.
//   Definition:
//     A collection of data useful for genealogical research such as a will
//     book, a deed book, a compiled genealogy in book pr periodical form, an
//     electronic database, or similar collection.  SOURCEs include both primary
//     and secondary works.  Generally a SOURCE will have one or more documents
//     such as specific wills inside the will book; in many cases there will be
//     additional levels of SOURCE.  In some cases, the SOURCE has only one
//     level; what we might think of as a document is conceptually the same as
//     the SOURCE.  Thus, SOURCE is self-referential and can handle data of any
//     reasonable number of hierarchical levels.
//   Primary Key:
//     Source-ID
//   Foreign Keys:
//     Higher-Source-ID (in SOURCE)
//     Subject-Place-ID (Place-ID in PLACE)
//     Jurisdiction-Place-ID (Place-ID in PLACE)
//     Researcher-ID (in RESEARCHER)
//   Relationships:
//     One high level SOURCE has zero to many lower level SOURCEs.
//     One low level SOURCE can belong to zero to one higher level SOURCE.
//     One SOURCE is part of zero to many SOURCE-GROUPs (through
//     SOURCE-GROUP-SOURCE).
//     One SOURCE-GROUP contains zero to many SOURCEs (through
//     SOURCE-GROUP-SOURCE).
//     One SOURCE is the object of zero to many SEARCHs  (through
//     REPOSITORY-SOURCE).
//     One SEARCH takes place in zero to one SOURCEs (through
//     REPOSITORY-SOURCE).  A SEARCH either takes place in a RESPOSITORY
//     (general SEARCH) or it takes place in a SOURCE (specific SEARCH).
//     One SOURCE is found in zero to many REPOSITORYs  (through
//     REPOSITORY-SOURCE).  The zero condition indicates a SOURCE that cannot
//     presently be associated with a particular REPOSITORY, i.e., the
//     RESEARCHER knows it exists, but does not know where to find it.
//     One REPOSITORY contains zero to many SOURCEs (through REPOSITORY-SOURCE).
//     One SOURCE was originally compiled about one jurisdiction PLACE and one
//     SOURCE is about a person from one PLACE (which may not be the same as the
//     jurisdiction PLACE).  (Thus one SOURCE is about exactly two PLACEs.)
//     One PLACE is associated with zero to many SOURCE jurisdictions and zero
//     to many SOURCE persons.
//     One SOURCE has zero to many REPRESENTATIONs, meaning that we might have
//     text representing the SOURCE as well as a photocopy or a photograph, or
//     some other multimedia REPRESENTATION.
//     A REPRESENTATION applies to only one SOURCE.  (In an example like a
//     photocopy that contains two small wills, the RESEARCHER can simply list
//     the same Physical-File-Code for both REPRESENTATIONs.)
//     One SOURCE has many CITATION-PARTs.  For example, at the book level, a
//     SOURCE has a title, author, place of publication, and many other parts.
//     One CITATION-PART cites one SOURCE.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('source').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('source', function(table) {

      // Unique key that identifies the SOURCE.
      table.increments('id').primary().unique();

      // Unique key that identifies the next higher level SOURCE associated with
      // this SOURCE.
      table.integer('higher_source_id').unsigned().references('id').inTable('source').notNullable();

      // Unique key that identifies the PLACE of the subject of this SOURCE.
      // Example:  A record in North Carolina describes a person and their
      // activities in Georgia.  Georgia is the subject place, and North
      // Carolina is the record jurisdiction place.
      table.integer('subject_place_id').unsigned().references('id').inTable('place').notNullable();

      // Unique key that identifies the PLACE of the jurisdiction of the record.
      table.integer('jurisdiction_place_id').unsigned().references('id').inTable('place').notNullable();

      // Unique key in RESEARCHER that identifies the person who gathered this
      // SOURCE record.
      table.integer('researcher_id').unsigned().references('id').inTable('researcher').notNullable();

      // The date associated with the subject of this SOURCE.  Note that there
      // can be a somewhat different date associated with each level of a multi
      // level SOURCE, such as a date range for a will book, and a more specific
      // date for the will itself, and then perhaps other dates associated with
      // small pieces of information in the will.
      table.specificType('subject_date', 'daterange').notNullable();

      table.string('medium').notNullable().defaultTo('');

      // Any comments about the SOURCE that are required.  If the SOURCE is at
      // the level of a whole “book” for example, such as a will book, the
      // comments may describe the poor condition and the difficulty in reading
      // most entries.
      table.text('comments').notNullable().defaultTo('');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
