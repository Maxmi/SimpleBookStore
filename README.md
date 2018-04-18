# TodoList

## Summary
My implementation of [Simple Book Store module of Learners Guild curriculum](https://curriculum.learnersguild.org/Phases/Practice/Modules/Simple-Book-Store/).  
A full-stack CRUD web application where users can:
 - view list of books,
 - search in the database by book title or author or genre,
 - edit book data,
 - add new book,
 - delete a book.  

## What I learned doing this project:
- seeding Postgres database with CSV data from a file  
- displaying data from the database in a paginated way  
- implementing a search from the local database  
- sending PUT and DELETE requests from a form using `method-override` module  

# Built with:

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [pg-promise](https://github.com/vitaly-t/pg-promise)
* [Pug](https://pugjs.org/)
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

# Deployed Site
  https://bookstore-mira.herokuapp.com/

# Getting Started

These instructions are for getting a copy of the project on your local environment.

* Clone/Fork - `git clone https://github.com/Maxmi/SimpleBookStore.git`
* Install npm packages - `npm install`

# Setting up your database

* Create database and tables - `npm run db:init` (make sure you don't have a db named `bookstore` as this command will delete it)

# Setting up your config

* Run `cp .env.template .env` command in the terminal to create your own `.env` file and enter your config values in the `.env` file

# Starting your development server

* Run `npm start`
* To access the app go to `http://localhost:3000`

# Running tests  
* Run `npm test`
