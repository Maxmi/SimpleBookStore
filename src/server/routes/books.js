const router = require('express').Router();
const booksQueries = require('../../models/db/books');

//route to search
//search results should be displayed on separate page
router.get('/search', (req, res) => {
  const { searchTerm } = req.query;
  booksQueries.search(searchTerm)
    .then(searchResult => {
      return res.render('books/searchResult', {
        searchTerm, searchResult
      });
    })
    .catch(err => console.log(err));
});


// //route to get one book
// router.get('/:bookID', (req, res) => {
//   const { bookID } = req.params;
//   booksQueries.getOneBook(bookID)
//     .then(book => {
//       res.render('books/details', {book});
//     })
//     .catch(err => console.log(err));
// });


//route to update book
router.put('/:bookID', (req, res) => {

});

//route to delete book
router.delete('/:bookID', (req, res) => {

});

module.exports = router;
