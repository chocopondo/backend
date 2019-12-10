'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DossieFilesSchema extends Schema {
  up () {
    this.create('dossie_files', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('dossieName', 250).notNullable() 
      table.string('dossiePath', 250).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('dossie_files')
  }
}

module.exports = DossieFilesSchema
