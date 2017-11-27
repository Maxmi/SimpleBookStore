const router = require('express').Router();
const books = require('../../models/db/books');
const booksRoutes = require('./books');

//list of all books should be displayed on the home page
//list should be paginated (we have lots of books)
//clickin on each book should open it's detail page
//or have a button for each book - view details
//where should updating and deleting be done?
//on the home page or on details page?
//probably on details page for each book
//probably on the home page there should be a form for adding new book
//or a button/link clickin on which should open the form - yes, admin page 
//search field also should be on the home page
router.get('/', (req, res, next) => {
  books.getAllBooks()
    .then(books => {
      res.render('../../views/index', {
        //
      })
    })
    .catch(err => next(err));
});

// router.use('/books', )
