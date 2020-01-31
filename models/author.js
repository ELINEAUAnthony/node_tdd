'use strict';
const postModel = require('./post')
const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  // postIds : [{type: mongoose.Schema.Types.ObjectId, ref: 'posts'}],
})

let authorModel = mongoose.model('authors', AuthorSchema, 'authors')
authorModel.getPosts = (author)=>{
  return postModel.find({authorId : author._id})
}
module.exports = authorModel



