/* WORKFLOW:

1. check seed file from current open directory & build out?

2. get authors table loaded.bs.modal

3. build relationship/joins table

4. get promises working

5. make other CRUD stuff working

6. add oAuth functionality

*/

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

// router.get('/books', function(req, res, next) {
//   Books().select().then(function(records){
//     Authors().select().then(function(authors) {
//       BooksAuthors().select().then(function(howjoin) {
//         res.render('books/books', { allBooks: records, allAuthors: authors, howRel: howjoin });
//       });
//     });
//   });
// });

router.get('/books', function(req, res, next) {
  knex.select().from('books').innerJoin('books_authors', 'books.id', 'books_authors.bookid').innerJoin('authors', 'books_authors.authorid', 'authors.id').then(function(results) {
    res.render('books/books', { joined: results});
  });
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.get('/books/:id', function(req, res, next) {
  Books().where({ id: req.params.id }).first().then(function(record) {
    res.render('books/display', { thisBook: record});
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
