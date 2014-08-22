// EVENT
//   Type:
//     Dependent.  Requires EVENT-TYPE.
//   Definition:
//     An EVENT is any type of happening such as a particular wedding.
//   Primary Key:
//     Event-ID
//   Foreign Keys:
//     Event-Type-ID (in EVENT-TYPE)
//     Place-ID (in PLACE)
//   Relationships:
//     One EVENT is of an EVENT-TYPE.
//     One EVENT-TYPE is manifested in zero to many EVENTs.
//     One EVENT is the subject of one ASSERTION.
//     One ASSERTION describes zero to two EVENTs.
//     One EVENT happens in one PLACE.
//     One PLACE can have zero to many EVENTs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('event').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('event', function(table) {

      // Unique identifier that indicates which event this is.
      table.increments('id').primary().unique();

      // Unique identifier that indicates to which EVENT-TYPE this event
      // belongs.
      table.integer('event_type_id').unsigned().references('id').inTable('event-type').notNullable();

      // Unique identifier in PLACE that indicates the place associated with
      // this EVENT.   In short, where did this EVENT take place?
      table.integer('place_id').unsigned().references('id').inTable('place').notNullable();

      // The name of the event, such as “Marriage of John Smith and Mary Jones”.
      table.string('name').notNullable().defaultTo('');

      // The date associated with the event.  This can be a point date (e.g., a
      // specific day, week, month, or year) or it can be a date range.
      table.specificType('date', 'daterange').notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
