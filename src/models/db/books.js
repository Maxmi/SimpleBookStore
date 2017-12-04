const db = require('./db');

const addBook = (title, author, genre, height, publisher) => {
  return db.one(`
    INSERT INTO books (title, author, genre, height, publisher)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    [title, author, genre, height, publisher]
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


const getIdByTitle = title => {
  return db.one(`
    SELECT id FROM books WHERE title=$1
  `, [title]
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
  getIdByTitle,
  countBooks,
  search,
  saveBook,
  removeBook
};
