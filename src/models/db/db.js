const pgp = require('pg-promise');
const monitor = require('pg-monitor');
monitor.attach({});

// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bookstore';

const connectionString = {
  host: 'localhost',
  port: 5432,
  database: process.env.NODE_ENV === 'test' ? 'bookstore_test' : 'bookstore'
};

const db = pgp(connectionString);

module.exports = db;
