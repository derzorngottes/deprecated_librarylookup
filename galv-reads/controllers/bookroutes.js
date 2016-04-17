var knex = require('../db/knex');

module.exports = {
  getAllBooks: function() {
    return knex('books').select();
  },
  getBookFromId: function(queryId) {
    return knex('books').where({ id: queryId }).first();
  },
  getBookByGenre: function(queryGenre) {
    return knex('books').where({ genre: queryGenre});
  },
  getBookFromTitle: function(queryTitle) {
    return knex('books').where({ title: queryTitle});
  },
  getBookFromAuthor: function(queryAuthor) {
    return knex('books').where({ author: queryAuthor});
  },
  addBook: function(metadata) {
    return knex('books').insert({ title: metadata.title, genre: metadata.genre, coverUrl: metadata.coverUrl, description: metadata.description, authors: metadata.authors });
  },
  editBook: function(metadata) {
    return knex('books').where({ id: metadata.id }).update({ title: metadata.title, genre: metadata.genre, coverUrl: metadata.coverUrl, description: metadata.description, authors: metadata.authors });
  },
  deleteBook: function(queryId) {
    return knex('books').where({ id: queryId }).del();
  }
}
