const router = require('express').Router();
const booksQueries = require('../../models/db/books');
// const booksRoutes = require('./books');

// route to home page
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

//route to add new book
//why for adding a book we don't have to write front-end code (add event listener to the add button? Is it because this is in the form and the button is of submit type?)
router.post('/new', (req, res) => {
  const {title, author, genre} = req.body;

  if(!(title || author || genre)) {
    res.render('books/new', {
      error: 'All fields are required.'
    });
  } else {
    booksQueries.addBook(title, author, genre)
      .then(book => {
        res.render('books/new', {
          message: 'New book has been added to inventory.'
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
});

//route to get one book
router.get('/books/:bookID', (req, res) => {
  const { bookID } = req.params;
  booksQueries.getOneBook(bookID)
    .then(book => {
      res.render('books/details', {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        height: book.height,
        publisher: book.publisher
      });
    })
    .catch(err => console.log(err));
});

//route to delete a book
router.delete('/books/:bookID', (req, res) => {
  const { bookID } = req.params;
  booksQueries.removeBook(bookID)
    .then((book) => {
      console.log('Deleted the book');
      res.redirect('/');
    })
    .catch(err => console.log(err));
});


module.exports = router;
