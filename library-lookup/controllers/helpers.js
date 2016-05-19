
// *** BOOKS FUNCTIONS *** //

function getIds(books) {
  var bookKeys = Object.keys(books);
  var justBooks = [];

  for (var i = 0; i < bookKeys.length; i++) {
    justBooks.push(books[bookKeys[i]]);
  }
  return justBooks;
}

module.exports = {
  getIds: getIds
}
