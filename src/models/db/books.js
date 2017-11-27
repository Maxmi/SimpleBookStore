const db = require('db');

const addBook = (title, author, genre) => {
  return db.one(`
    INSERT INTO bookstore (title, author, genre)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [
      title, author, genre
    ])
    .catch(error => {
      console.error({message: 'Error occured when adding book to db',
        arguments: arguments});
      throw error;
    });
};

const getAllBooks = () => {
  return db.any(`
    SELECT * FROM bookstore
  `)
    .catch(error => {
      console.error({message: 'Error occured when getting list of books from db',
        arguments: arguments});
      throw error;
    });
};

const getOneBook = id => {
  return db.one(`
    SELECT * FROM books WHERE id=$1
  `, [id])
    .catch(error => {
      console.error({message: 'Error occured when adding book to db',
        arguments: arguments});
      throw error;
    });
};

const updateBook = (title, author, genre, id) => {
  return db.none(`
    UPDATE books
    SET title=$1, author=$2, genre=$3
    WHERE id=$4
  `,
    [
      title, author, genre, id
    ])
    .catch(error => {
      console.error({message: 'Error occured when adding book to db',
        arguments: arguments});
      throw error;
    });
};

const removeBook = id => {
  return db.result(`
    DELETE FROM books
    WHERE id=$1
  `, [id])
    .catch(error => {
      console.error({message: 'Error occured when adding book to db',
        arguments: arguments});
      throw error;
    });
};

module.exports = {
  addBook,
  getAllBooks,
  getOneBook,
  updateBook,
  removeBook
};
