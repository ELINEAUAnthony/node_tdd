'use strict';
const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})

module.exports = mongoose.model('authors', AuthorSchema)



