const {expect} = require('chai');
const {
  addBook,
  getAllBooks,
  countBooks,
  getOneBook,
  search,
  saveBook,
  removeBook
} = require('../src/models/db/books');

const {
  truncateTable,
  resetTable,
  resetAndCount,
  countRows
} = require('./helpers');


describe('database queries', () => {

  beforeEach(() => {
    return resetTable();
  });

  describe('getAllBooks', () => {
    context('when db is empty', () => {
      beforeEach(() => {
        return truncateTable();
      });
      it('should return empty array', () => {
        return getAllBooks(1,1)
          .then(books => {
            expect(books.length).to.equal(0);
          });
      });
    });

    context('when db has data and limit=1 and offset=0', () => {
      it('should return one record, which is the 1st row of the table', () => {
        return getAllBooks(1,0)
          .then(books => {
            expect(books).to.be.a('array');
            expect(books.length).to.equal(1);
            expect(books[0].id).to.equal(1);
          });
      });
    });

    context('when db has data and limit=1 and offset=1', () => {
      it('should return one record, which is the 2nd row of the table', () => {
        return getAllBooks(1,1)
          .then(books => {
            expect(books).to.be.a('array');
            expect(books.length).to.equal(1);
            expect(books[0].id).to.equal(2);
          });
      });
    });
  }); //get all books

  describe('case-insensitive search for a book', () => {
    context('when searching by title and that title exists in the db', () => {
      it('should return results for that title', () => {
        return search('Sherlock')
          .then(results => {
            expect(results).to.be.a('array');
            expect(results.length).to.be.above(0);
            expect(results[0].title).to.contain('Sherlock');
          });
      });
    });
    context('when searching by author and that author exists in the db', () => {
      it('should return results for that author', () => {
        return search('doyle')
          .then(results => {
            expect(results).to.be.a('array');
            expect(results.length).to.be.above(0);
            expect(results[0].author).to.contain('Doyle');
          });
      });
    });
    context('when searching by genre and that genre exists in the db', () => {
      it('should return results for that genre', () => {
        return search('psychology')
          .then(results => {
            expect(results).to.be.a('array');
            expect(results.length).to.be.above(0);
            expect(results[0].genre).to.equal('psychology');
          });
      });
    });
    context('when searched title/author/genre doesn\'t exist in the db', () => {
      it('should return empty list', () => {
        return search('Watson')
          .then(results => {
            expect(results).to.be.a('array');
            expect(results.length).to.equal(0);
          });
      });
    });
  }); //search


  describe('add book', () => {
    let bookCountBefore;
    beforeEach(() => {
      return resetAndCount()
        .then(result => {
          bookCountBefore = parseInt(result.count);
        })
    });
    it('should add a book into db', () => {
      return addBook('test', 'tester', 'testing')
        .then(() => {
          return countRows()
            .then(result => {
              expect(parseInt(result.count)).to.equal(bookCountBefore + 1);
            });
        });
    });
  });


  describe('get one book', () => {
    it('should return data on one book', () => {
      return getOneBook(1)
        .then(book => {
          expect(book).to.be.an('object');
          expect(book).to.have.property('title');
          expect(book.title).to.equal('book1');
          expect(book).to.have.property('author');
          expect(book.author).to.equal('author1');
          expect(book).to.have.property('genre');
          expect(book.genre).to.equal('genre1');
          expect(book).to.have.property('height');
          expect(book.height).to.equal(100);
          expect(book).to.have.property('publisher');
          expect(book.publisher).to.equal('publisher1');
        });
    });
  });

  describe('update a book', () => {
    it('should update data on a book with given ID', () => {
      return saveBook(1, 'changed title', 'changed author', 'changed genre', 150, 'changed publisher')
        .then(book => {
          expect(book).to.be.an('object');
          expect(book).to.have.property('title');
          expect(book.title).to.equal('changed title');
          expect(book).to.have.property('author');
          expect(book.author).to.equal('changed author');
          expect(book).to.have.property('genre');
          expect(book.genre).to.equal('changed genre');
          expect(book).to.have.property('height');
          expect(book.height).to.equal(150);
          expect(book).to.have.property('publisher');
          expect(book.publisher).to.equal('changed publisher');
        });
    });
  });

  describe('delete a book', () => {
    let bookCountBefore;
    beforeEach(() => {
      return resetAndCount()
        .then(result => {
          bookCountBefore = parseInt(result.count);
        })
    });
    it('should remove a book from db', () => {
      return removeBook(1)
        .then(() => {
          return countRows()
            .then(result => {
              expect(parseInt(result.count)).to.equal(bookCountBefore - 1);
            });
        });
    });
  });

});//most outer describe
