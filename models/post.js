'use strict';
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
})

// const PostSchema = new mongoose.Schema({
//   data: [{
//     type: String,
//     id: String,
//     attributes:{
//       title: String,
//       content: String,
//       authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'authors'}
//     },
//     relationships:{
//       author:{
//         data: {authorId: String}
//       }
//     }
//   }]
// })

module.exports = mongoose.model('posts', PostSchema, 'posts')