'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IsrgSchema extends Schema {
  up () {
    this.table('dossie_files', (table) => {
      table.boolean('isrg').defaultTo(false)
    })
  }

  down () {
    this.table('dossie_files', (table) => {
      // reverse alternations
    })
  }
}

module.exports = IsrgSchema
