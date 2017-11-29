const booksQueries = require('../../models/db/books');
const router = require('express').Router();

//route to search
//search results should be displayed on new page
router.get('/search', (req, res) => {
  const { searchTerm } = req.query;
  booksQueries.search(searchTerm)
    .then(searchResult => {
      return res.render('books/searchResult', {
        searchTerm, searchResult
      })
    })
    .catch(err => console.log(err));
});


//route to get one book
router.get('/:bookID', (req, res) => {
  const { bookID } = req.params;
  booksQueries.getOneBook(bookID)
    .then(book => {
      res.render('books/details', {book})
    })
    .catch(err => console.log(err));
});


//route to add new book -after adding should redirect to that book's page
router.post('/new', (req, res) => {
  const {title} = req.body;
  const {author} = req.body;
  const {genre} = req.body;

  booksQueries.addBook(req.body)
    .then(book => {
      console.log('New item has been added to inventory');
      return res.redirect(`books/${bookID}`);
    })
    .catch(err => {
      console.log(err);
    });
});

//route to update book
router.put('/:bookID', (req, res) => {

});

//route to delete book
router.delete('/:bookID', (req, res) => {

});

module.exports = router;
