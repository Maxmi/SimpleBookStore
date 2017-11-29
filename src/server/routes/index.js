const router = require('express').Router();
const booksQueries = require('../../models/db/books');
// const booksRoutes = require('./books');

router.get('/', (req, res) => {
  const currentPage = parseInt(req.query.page || 1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const numPageLinks = 10;
  const lastPage = currentPage + numPageLinks;
  // const isMoreRows = booksQueries.numRowsAfterOffset(offset, numPageLinks * limit);

  booksQueries.getAllBooks(limit, offset)
    .then(books => {
      res.render('books/index', {
        title: 'SimpleBookStore Home Page',
        data: books,
        currentPage,
        lastPage,
      });
    })
    .catch(err => console.log(err));
});

//route to view form for adding new book
router.get('/new', (req, res) => {
  res.render('books/new');
});


// route to view book details page
router.get('/?bookID', (req, res) => {
  res.render('books/?bookID');
});

module.exports = router;
