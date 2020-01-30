'use strict';
const Author = require('./author')
const Post = require('./post')

const env = process.env.NODE_ENV || 'development';
console.log(env);
const config = require(__dirname + '/../config/config');
const db = require('mongoose');

db.connect(`mongodb://localhost:27017/${config.database}`, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => {
  if (err) throw err
  console.log('mongodb successfully connected.') 
}) 

db.close = async () => {
  await db.connection.close()
};

db.Author = Author
db.Post = Post

module.exports = db;
