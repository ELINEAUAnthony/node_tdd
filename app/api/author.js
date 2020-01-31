module.exports = (app, db) => {
    app.post('/author', async (req, res) => {
      await db.Author.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      }).then((result) => res.json(result))
    })
  
    app.get('/authors', async (req, res) => {
      await db.Author.aggregate([
        {$match: {}},
        {$project: { _id: 1, firstName: 1, lastName: 1 }}
      ]).then((result) => {
        res.header('Content-Type', 'application/vnd.api+json')
        return res.json(result)
      })
    })
  }