/* to do

1. Make edit, add, and delete routes work for books and authors independently
2. Then alter the routes so that they remove the whole record and re-insert it
3. Then add user validations following method from Finder example
4. Then add error handling
5. Then tidy up layout


*/

var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');
var bookmethods = require('../controllers/bookmethods.js');
var authormethods = require('../controllers/authormethods.js');
var _ = require('lodash');
var object = require('lodash/fp/object');

router.use(methodOverride('_method'));

//Book routes

router.get('/books', function(req, res, next) {
  if (req.query['search']) {
    bookmethods.getBookFromTitle(req.query.search).then(function(record) {
      res.render('books/display', { genre: false, thisBook: record });
    });
  }
  else {
    bookmethods.booksJoinAuthors().then(function(records) {
      res.render('books/books', { index: records });
    });
  }
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.get('/books/:id', function(req, res, next) {
  bookmethods.booksJoinAuthors().then(function(records) {
    res.render('books/display', { genre: false, thisBook: records[req.params.id] })
  });
});

router.get('/books/genre/:genre', function(req, res, next) {
  bookmethods.getBookByGenre(req.params.genre).then(function(records) {
    res.render('books/display', { genre: true, booksByGenre: records });
  });
});

router.post('/books', function(req, res, next) {
  bookmethods.addBook(req.body).then(function() {
    res.redirect('/books');
  });
});

router.get('/books/:id/edit', function(req, res, next) {
  bookmethods.getBookFromId(req.params.id).then(function(record) {
    res.render('books/edit', { thisBook: record });
  });
});

router.put('/books/:id', function(req, res, next) {
  bookmethods.editBook(req.body).then(function(record) {
    res.redirect('books/' + req.params.id);
  });
});

router.get('/books/:id/delete', function(req, res, next) {
  bookmethods.getBookFromId(req.params.id).then(function(record) {
    res.render('books/delete', { thisBook: record });
  });
});

router.delete('/books/:id', function(req, res, next) {
  bookmethods.deleteBook(req.params.id).then(function() {
    res.redirect('/books');
  });
});

//Author routes

router.get('/authors', function(req, res, next) {
  authormethods.getAllAuthors().then(function(records) {
    res.render('authors', { allAuthors: records });
  })
});

router.get('/authors/:id', function(req, res, next) {
  authormethods.getAuthorFromId(req.params.id).then(function(record) {
    res.render('/authors/display', { author: record });
  });
});

module.exports = router;
