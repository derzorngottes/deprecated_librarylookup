var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');

var knex = require('../db/knex');
function Books() {
  return knex('books');
}
function Authors() {
  return knex('authors');
}
function BooksAuthors() {
  return knex('books_authors');
}

router.use(methodOverride('_method'));

router.get('/books', function(req, res, next) {
  if (req.query['search']) {
    Books().where({ title: req.query.search }).first().then(function(record) {
      res.render('books/display', { genre: false, thisBook: record });
    });
  }
  else {
    knex.select().from('books').innerJoin('books_authors', 'books.id', 'books_authors.bookid').innerJoin('authors', 'books_authors.authorid', 'authors.id').then(function(results) {
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
      res.render('books/books', { index: indexer });
    });
  }
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.get('/books/:id', function(req, res, next) {
  Books().where({ id: req.params.id }).first().then(function(record) {
    res.render('books/display', { genre: false, thisBook: record});
  });
});

router.get('/books/genre/:genre', function(req, res, next) {
  Books().where({ genre: req.params.genre }).select().then(function(booksByGenre) {
    res.render('books/display', { genre: true, booksByGenre: booksByGenre });
  });
});

router.get('/authors', function(req, res, next) {
  Authors().select().then(function(results) {
    res.render('authors', { allAuthors: results});
  });
});

router.post('/books', function(req, res, next) {
  Books().insert({ title: req.body.title, genre: req.body.genre, coverUrl: req.body.coverUrl, description: req.body.description, authors: req.body.authors }).then(function() {
    res.redirect('/books');
  });
});

router.get('/books/:id/edit', function(req, res, next) {
  Books().where({ id: req.params.id }).first().then(function (record) {
    res.render('books/edit', { thisBook: record });
  });
});

router.put('/books/:id', function(req, res, next) {
  Books().where({ id: req.params.id }).update({ title: req.body.title, genre: req.body.genre, coverUrl: req.body.coverUrl, description: req.body.description, authors: req.body.authors }).then(function (record) {
    res.redirect('/books/' + req.params.id);
  });
});

router.get('/books/:id/delete', function(req, res, next) {
  Books().where({ id: req.params.id }).first().then(function (record) {
    res.render('books/delete', {thisBook: record});
  });
});

router.delete('/books/:id', function(req, res, next) {
  Books().where({id: req.params.id}).del().then(function(results) {
    res.redirect('/books/');
  })
});

module.exports = router;
