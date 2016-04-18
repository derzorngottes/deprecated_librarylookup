var knex = require('../db/knex');

module.exports = {
  getAllAuthors: function() {
    return knex('authors').select();
  },
  getAuthorFromName: function(queryFirst, queryLast) {
    return knex('authors').where({ firstname: queryFirst, lastname: queryLast }).first();
  },
  getAuthorByGenre: function(queryGenre) {

  },
  addAuthor: function(authorData) {
    return knex('authors').insert({ firstname: authorData.firstname, lastname: authorData.lastname, portraiturl: authorData.portraiturl, bio: authorData.bio, books: authorData.books });
  },
  editAuthor: function(authorData) {
    return knex('authors').where({ firstname: authorData.firstname, lastname: authorData.lastname }).update({ firstname: authorData.firstname, lastname: authorData.lastname, portraiturl: authorData.portraiturl, bio: authorData.bio, books: authorData.books });
  },
  deleteAuthor: function(authorId) {
    return knex('books').where({ id: authorId }).del();
  }
}
