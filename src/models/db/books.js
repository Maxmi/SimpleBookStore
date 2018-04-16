const db = require('./db');

/**
 * Function to add a book into db
 * @param { String } title     String entered into title field of the form
 * @param { String } author    String entered into author field
 * @param { String } genre     String entered into genre field
 * @param { Number } height    Number entered into height field
 * @param { String } publisher String entered into publisher field
 * @return { Promise } - Promise resolving to object representing a book
 */
const addBook = (title, author, genre, height, publisher) => {
  return db.one(`
    INSERT INTO books (title, author, genre, height, publisher)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [title, author, genre, height, publisher]
  );
};

/**
 * Function to get all books from db
 * @param  { Number } limit  Number representing number of books to be displayed on a page
 * @param  { Number } offset Number representing number of rows to skip
 * @return { Promise }       Promise resolving into array of objects each representing a book
 */

const getAllBooks = (limit, offset) => {
  return db.any(`
    SELECT id, title, author FROM books
    LIMIT $1 OFFSET $2
  `, [limit, offset]
  );
};

/**
 * Function to count number of book in the db. Needed for pagination
 * @return { Promise } Promise resolving into an object with property count and value equal to number of books in the db
 */
const countBooks = () => {
  return db.one(`
    SELECT COUNT(title) FROM books
  `);
};

/**
 * Function to get data on one book
 * @param  { Number } id ID of a book to retrieve info on
 * @return { Promise }    Promise resolving into an object representing a book
 */

const getOneBook = id => {
  return db.one(`
    SELECT * FROM books WHERE id=$1
  `, [id]
  );
};

/**
 * Function to do a search in the db
 * @param  { String } searchTerm String entered into search field on the index page
 * @return { Promise }           Promise resolving into array of objects each representing returned book
 */
const search = (searchTerm) => {
  return db.query(`
    SELECT * FROM books WHERE
    title || author || genre ILIKE '%$1#%'
  `, [searchTerm]
  );
};


/**
 * Function for updating book data
 * @param  { Number } id        ID of a book to be updated
 * @param  { String } title     String in the title field of the form
 * @param  { String } author    String in the author field
 * @param  { String } genre     String in the genre field
 * @param  { Number } height    Number in the height field
 * @param  { String } publisher String in the publisher field
 * @return { Promise }          Promise resolving into object with book data
 */
const saveBook = (id, title, author, genre, height, publisher) => {
  return db.query(`
    UPDATE books
    SET id=$1, title=$2, author=$3, genre=$4, height=$5, publisher=$6
    WHERE id=$1
    RETURNING *
  `,
    [id, title, author, genre, height, publisher]
  );
};

/**
 * Function to remove a book from db
 * @param  { Number } id ID of a book to be removed
 * @return { Promise }   Promise who's resolution is unimportant
 */
const removeBook = id => {
  return db.query(`
    DELETE FROM books
    WHERE id=$1
  `, [id]
  );
};

module.exports = {
  addBook,
  getAllBooks,
  getOneBook,
  countBooks,
  search,
  saveBook,
  removeBook
};
