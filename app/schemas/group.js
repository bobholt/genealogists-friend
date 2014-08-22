// GROUP
//   Type:
//     Dependent.  Requires GROUP-TYPE.
//   Definition:
//     In genealogical data, there are group members for which we can’t identify
//     query conditions to return the set.  In other words, membership in a
//     group such as “men who worked on the Davison Road in August, 1851” may be
//     important genealogically, but no other attributes will sufficiently code
//     for this.  Thus, those members need to be tagged as explicit members of
//     one or more groups.  Groups are also used in this data model for concepts
//   such as a group of children for a union of a man and woman.
//   Primary Key:
//     Group-ID
//   Foreign Keys:
//     Group-Type-ID (in GROUP-TYPE)
//     Place-ID (in PLACE)
//   Relationships:
//     One GROUP is of a GROUP-TYPE.
//     One GROUP-TYPE is manifested in zero to many GROUPs.
//     One GROUP is the subject of one ASSERTION.
//     One ASSERTION describes zero to two GROUPs.
//     One GROUP was brought together in one PLACE.
//     One PLACE can have zero to many GROUPs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('group').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('group', function(table) {

      // Unique identifier that indicates which group this is.
      table.increments('id').primary().unique();

      // Unique identifier that indicates to which GROUP-TYPE this group
      // belongs.
      table.integer('group_type_id').unsigned().references('id').inTable('group-type').notNullable();

      // Unique identifier in PLACE that indicates the place associated with
      // this GROUP.  In the example of a group of neighbors, it would be the
      // small area where they lived.  In the case of the Titanic passengers and
      // crew, it might be the city that they sailed from, or it might be the
      // location in the ocean of the disaster as appropriate to the
      // researcher’s genealogical needs.  Some groups may not be associated
      // with a place.
      table.integer('place_id').unsigned().references('id').inTable('place').notNullable();

      // The name of the group.
      table.string('name').notNullable().defaultTo('none');

      // The date associated with the group.  This can be a point date (e.g., a
      // specific day, week, month, or year) or it can be a date range.
      table.specificType('date', 'daterange').notNullable();

      // The criteria for admission to the group.  For example, one group might
      // be all the neighbors listed in a particular document, while a second
      // group is a similar group of neighbors listed in a second document, or
      // the same document at a different time.
      table.string('criteria').notNullable().defaultTo('none');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
