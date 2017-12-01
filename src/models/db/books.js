const db = require('./db');

const addBook = (title, author, genre) => {
  return db.one(`
    INSERT INTO books (title, author, genre)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [title, author, genre]
  );
};

const getAllBooks = (limit, offset) => {
  return db.any(`
    SELECT id, title, author FROM books
    LIMIT $1 OFFSET $2
  `, [limit, offset]
  );
};

const countBooks = () => {
  return db.one(`
    SELECT COUNT(title) FROM books
  `);
};


const getOneBook = id => {
  return db.one(`
    SELECT * FROM books WHERE id=$1
  `, [id]
  );
};


const search = (searchTerm) => {
  return db.query(`
    SELECT * FROM books WHERE
    lower(title || author || genre) LIKE $1::text
  `,
    [`%${searchTerm.toLowerCase().replace(/\s+/,'%')}%`]
  );
};

const updateBook = (title, author, genre, id) => {
  return db.none(`
    UPDATE books
    SET title=$1, author=$2, genre=$3
    WHERE id=$4
  `,
    [title, author, genre, id]
  );
};

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
  updateBook,
  removeBook
};
