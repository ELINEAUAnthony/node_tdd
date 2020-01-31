module.exports = (app, db) => {
    app.post('/post', async (req, res) => {
      await db.Post.create({
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.authorId,
      }).then((result) => res.json(result))
    })
  }