var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');

var knex = require('../db/knex');
function Books() {
  return knex('books');
}

router.use(methodOverride);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', function(req, res, next) {
  Albums().select().then(function (records) {
    res.render('books/books', {allBooks: records});
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
