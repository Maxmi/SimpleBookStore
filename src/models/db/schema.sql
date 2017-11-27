DROP DATABASE IF EXISTS bookstore;
CREATE DATABASE bookstore;

\c bookstore

DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL,
  title varchar(255) NOT NULL,
  author varchar(255),
  genre varchar(255),
  height varchar(255),
  publisher varchar(255)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  email varchar(255) UNIQUE NOT NULL PRIMARY KEY,
  password varchar(255) NOT NULL
);
