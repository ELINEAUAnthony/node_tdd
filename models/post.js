'use strict';
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
})

module.exports = mongoose.model('posts', PostSchema)