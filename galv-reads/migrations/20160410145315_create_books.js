
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function (table) {
    table.increments();
    table.string('title');
    table.string('genre');
    table.string('cover-url');
    table.text('description');
  });
  return knex.schema.createTable('authors', function (table) {
    table.increments();
    table.string('first-name');
    table.string('last-name');
    table.text('bio');
    table.string('portrait-url');
  });
  return knex.schema.createTable('books_authors', function (table) {
    table.increments();
    table.number('book-id');
    table.number('author-id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
  return knex.schema.dropTable('authors');
  return knex.schema.dropTable('books_authors');
};
