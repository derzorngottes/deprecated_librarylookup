var knex = require('../db/knex');
var _ = require('lodash');

module.exports = {
  getAllBooks: function() {
    return knex('books').select();
  },

  booksJoinAuthors : function() {
    return knex.select().from('books').innerJoin('books_authors', 'books.id', 'books_authors.bookid').innerJoin('authors', 'books_authors.authorid', 'authors.id').then(function(results) {
      var indexer = {};
      for(var i=0; i <results.length; i++){
        if(!(results[i].bookid in indexer)) {
          indexer[results[i].bookid] = [results[i]];
          indexer[results[i].bookid][1] = [];
          indexer[results[i].bookid][1].push(results[i].firstname + ' ' + results[i].lastname);
        }
        else {
          indexer[results[i].bookid][1].push(results[i].firstname + ' ' + results[i].lastname);
        }
      }
      return indexer;
    });
  },

  getBookFromId: function(queryId) {
    return knex('books').where({ id: queryId }).first();
  },

  getBookByGenre: function(queryGenre) {
    var query = queryGenre.charAt(0).toUpperCase() + queryGenre.slice(1);

    return knex.select().from('books').innerJoin('books_authors', 'books.id', 'books_authors.bookid').innerJoin('authors', 'books_authors.authorid', 'authors.id').where({ genre: query }).then(function(results) {
      var indexer = {};
      for(var i=0; i <results.length; i++){
        if(!(results[i].bookid in indexer)) {
          indexer[results[i].bookid] = [results[i]];
          indexer[results[i].bookid][1] = [];
          indexer[results[i].bookid][1].push(results[i].firstname + ' ' + results[i].lastname);
        }
        else {
          indexer[results[i].bookid][1].push(results[i].firstname + ' ' + results[i].lastname);
        }
      }
      return indexer;
    });
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
    console.log(metadata);
    return knex('books').where({ id: metadata.id }).first().update({ title: metadata.title, genre: metadata.genre, coverUrl: metadata.coverUrl, description: metadata.description, authors: metadata.authors });
  },

  deleteBook: function(queryId) {
    return knex('books').where({ id: queryId }).del();
  }
}
