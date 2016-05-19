
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('books', function (table) {
      table.increments();
      table.string('title');
      table.string('genre');
      table.text('description');
      table.string('coverUrl');
    }),
    knex.schema.createTable('authors', function (table) {
      table.increments();
      table.string('firstName');
      table.string('lastName');
      table.text('bio');
      table.string('portraitUrl');
    }),
    knex.schema.createTable('books_authors', function (table) {
      table.increments();
      table.integer('bookid');
      table.integer('authorid');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('books'),
    knex.schema.dropTable('authors'),
    knex.schema.dropTable('books_authors')
  ]);
};
