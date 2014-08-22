// GROUP-TYPE-ROLE
//   Type:
//     Dependent.  Requires GROUP-TYPE.
//   Definition:
//     The standard individual members of a defined group type, such as
//     “Private, Corporal, Sergeant”, “Bride, Groom, Witness”, or “Miner, Pit
//     Boss, Superintendent”.
//   Primary Key:
//     Group-Type-Role-ID
//   Foreign Keys:
//     Group-Type-ID (in GROUP-TYPE)
//   Relationships:
//     Each GROUP-TYPE-ROLE belongs to only one GROUP TYPE.
//     A GROUP-TYPE can have zero to many GROUP-TYPE-ROLEs.  The zero condition
//     is for unity, where there is only one group type role in the group type,
//     meaning everyone in the group is of the same rank or type, such as a
//     group of neighbors.
//     A GROUP-TYPE-ROLE can appear in zero to many ASSERTIONs in the Value
//     attribute.
//     One ASSERTION is about zero or one GROUP-TYPE-ROLEs.

'use strict';

// Dependencies
var knex = require('knex').knex;

// Session Schema
knex.schema.hasTable('group-type-role').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('group-type-role', function(table) {

      // Unique key that identifies each member of the GROUP-TYPE.
      table.increments('id').primary().unique();

      // Unique key that identifies the GROUP-TYPE to which these members
      // belong.
      table.integer('group_type_id').unsigned().references('id').inTable('group-type').notNullable();

      // The value that distinguishes the different members of the group type,
      // such as role (bride, groom, witness) or rank (captain, major, colonel).
      table.string('name').notNullable().defaultTo('');

      // The alphanumeric sequence number that causes the highest ranked group
      // type member to be sorted high.  For example, if the group consisted of
      // (in this short example) “Colonel, General”, Colonel might be assigned a
      // sequence number of 2 and General a 1 to indicated that General ranks
      // above Colonel.  In the case of roles, sequence number may be irrelevant
      // and may only serve to order the list for presentation so that “bride,
      // groom, minister, witness, flower girl, ring bearer” appear in that
      // order and not alphabetically.
      table.integer('sequence_number').unsigned().notNullable();

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').notNullable();
    });
  }
});
