'use strict';

const AuthorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})

module.exports = mongoose.model('authors', AuthorSchema)



