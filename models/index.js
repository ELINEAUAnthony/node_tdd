'use strict';

const env = process.env.NODE_ENV || 'development';
console.log(env);
const config = require(__dirname + '/../config/config');
const db = require('mongoose');

db.connect(`mongodb://localhost:27017/${config.database}`, (err) => {
  if (err) throw err
  console.log('mongodb successfully connected.')
})

db.close = async () => {
  await db.connection.close()
};

module.exports = db;
