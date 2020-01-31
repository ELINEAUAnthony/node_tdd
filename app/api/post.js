module.exports = (app, db) => {
    app.post('/post', async (req, res) => {
      await db.Post.create({
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.authorId,
      }).then((result) => res.json(result))
    })
  }

module.exports = (app, db) => {
  app.get('/posts', async (req, res) => {
    await db.Post.find().select('_id title content').exec()
    .then((data) => {
      const array =[]
      posts.forEach(element => {
          const postSerialize = {
              type:'post',
              _id: element._id.toString(),
              attributes: {
                  title: element.title,
                  content: element.content
              },
              relationships: {
                author: {
                  data: {_id: element.authorId.toString() , type: 'author'}
                }
              }
          }
          array.push(postSerialize)
      });
      res.status(200).json(array)
  })
.catch(err => res.status(400).json(err))
})
}