'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewfieldsDossieSchema extends Schema {
  up () {
    this.table('dossie_files', (table) => {
      table.boolean('tipo_dossie').defaultTo(false)
    })
  }

  down () {
    this.table('dossie_files', (table) => {
      // reverse alternations
    })
  }
}

module.exports = NewfieldsDossieSchema
