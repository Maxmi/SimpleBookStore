const router = require('express').Router();
const booksQueries = require('../../models/db/books');

// route to home page
router.get('/', (req, res) => {
  const currentPage = parseInt(req.query.page || 1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const numPageLinks = 10;
  const lastPage = currentPage + numPageLinks;
  let totalPages;

  booksQueries.countBooks()
    .then(result => {
      totalPages = Math.ceil(parseInt(result.count) / limit);
      if(currentPage > totalPages) {
        res.status(404);
        res.render('books/error', {
          error: '404 not found'
        });
      }
    })
    .then(() => {
      booksQueries.getAllBooks(limit, offset)
        .then(books => {
          res.render('books/index', {
            title: 'SimpleBookStore Home Page',
            data: books,
            currentPage,
            lastPage,
            totalPages
          });
        })
        .catch(err => console.log(err));
    });
});


//route to view form for adding new book
router.get('/new', (req, res) => {
  res.render('books/new');
});

//route to add new book
router.post('/new', (req, res) => {
  const {title, author, genre, height, publisher} = req.body;

  if(!(title || author || genre)) {
    res.render('books/new', {
      error: 'Title and author fields are required.'
    });
  } else {
    booksQueries.addBook(title, author, genre, height, publisher)
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

//route to update a book
router.put('/books/:bookID', (req, res) => {
  const { id, title, author, genre, height, publisher } = req.body;
  booksQueries.saveBook(id, title, author, genre, height, publisher)
    .then(() => {
      booksQueries.getOneBook(id)
        .then(book => {
          res.render('books/details', {
            id: book.id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            height: book.height,
            publisher: book.publisher
          });
        });
    })
    .catch(err => console.log(err));
});

//route to search
router.get('/searchResult', (req, res) => {
  const searchTerm = req.query.search;
  booksQueries.search(searchTerm)
    .then(searchRes => {
      res.render('books/searchResult', {
        searchTerm,
        searchRes
      });
    })
    .catch(err => console.log(err));
});


//route to delete a book
router.delete('/books/:bookID', (req, res) => {
  const { bookID } = req.params;
  booksQueries.removeBook(bookID)
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});


// error handler for all other routes
router.use((err, req, res) => {
  res.json({ error: true, message: err.toString() });
});


module.exports = router;
