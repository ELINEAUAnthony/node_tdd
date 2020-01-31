const request = require('supertest')
const app = require('../app')
const db = require('../models');
const cleanDb = require('./helpers/cleanDb')
require('./factories/author').factory
require('./factories/post').factory
const factory = require('factory-girl').factory

beforeAll(async () => {
    await cleanDb(db)
  });


describe('GET /', () => {
  let response;

  beforeEach(async () => {
    await cleanDb(db)
    response = await request(app).get('/');
  })
 
  test('It should respond with a 200 status code', async () => {
    expect(response.statusCode).toBe(200);
  });

});

describe('when there is one or more authors in database', () => {
  beforeAll(async () => {
    await cleanDb(db)
    authors = await factory.createMany('author', 2)
    response = await request(app).get('/authors').set('Accept', 'application/json')
  })

  // test('It should not retrieve any author in db', async () => {
  //   const authorsInDatabase = await db.Author.find()
  //   expect(authorsInDatabase.length).toBe(5)
  // });
  // test('It should respond with a 200 status code', async () => {
  //   expect(response.statusCode).toBe(200)
  // });
  test('It should return a json with a void array', async () => {
    expect(response.body.length).toBe(2)
    for (i = 0; i < 2 ; i++) {
      const expectedBody = {
        _id: authors[i]._id.toString(),
        firstName: authors[i].firstName,
        lastName: authors[i].lastName,
      }
      expect(response.body).toContainEqual(expectedBody)
    }
  });
})

describe('GET /posts', () => {

  let response;
  let data = {};

  beforeAll(async () => await cleanDb(db))

  describe('when there is no author in database', () => {
    beforeAll(async () => {
      posts = await factory.createMany('post', 2)

      response = await request(app).get('/posts').set('Accept', 'application/vnd.api+json');
    })


    // test('It should not retrieve any authors in db', async () => {
    //   const posts = await db.Post.find()
    //   expect(posts.length).toBe(0);
    // });

    // test('It should respond with a 200 status code', async () => {
    //   expect(response.statusCode).toBe(200);
    // });

    test('It should return a json with a void array', async () => {
      var test = [{
          type: "post",
          _id: posts[0]._id.toString(),
          attributes: {
            title: posts[0].title,
            content: posts[0].content,
          },relationships: {
            author: {
              data: {_id: posts[0].authorId.toString(), type: "author"}
            }
          }
        },{
          type: "post",
          _id: posts[1]._id.toString(),
          attributes: {
            title: posts[1].title,
            content: posts[1].content,
          },relationships: {
            author: {
              data: {_id: posts[1].authorId.toString(), type: "author"}
            }
          }
        }
      ]
      expect(response.body).toStrictEqual(test);
      await console.log(test);
    });
  })
});

describe('POST /author', () => {

    let response;
    let data = {};
  
    beforeAll(async () => {
      data.firstName = 'John'
      data.lastName = 'Wick'
      response = await request(app).post('/author').send(data);
    })
  
    test('It should respond with a 200 status code', async () => {
      expect(response.statusCode).toBe(200);
    });
    
    test('It should return a json with the new author', async () => {
        expect(response.body.firstName).toBe(data.firstName);
        expect(response.body.lastName).toBe(data.lastName);
      });

    test('It should create and retrieve a post for the selected author', async () => {
      const author = await db.Author.findOne({
          _id: response.body._id
      })
      
      expect(author._id.toString()).toBe(response.body._id)
      expect(author.firstName).toBe(data.firstName)
      expect(author.lastName).toBe(data.lastName)
    });
  });

  // describe('POST /post', () => {

  //   let response
  //   let data = {}
  //   let post
  //   let author
  
  //   beforeAll(async () => await cleanDb(db))
  
  //   describe('The author has one or multiple posts', () => {
  //     beforeAll(async () => {
  //       author = await factory.create('author')
  //       post = await factory.build('post')
        
  //       data.title = post.title
  //       data.content = post.content
  //       data.authorId = author._id
  //       response = await request(app).post('/post').send(data).set('Accept', 'application/json')
  //     })
  //     test('It should respond with a 200 status code', async () => {
  //       expect(response.statusCode).toBe(200);
  //     });
  //   })

  //   test('It should create and retrieve a post for the selected author', async () => {
  //     const postsInDatabase = await db.Post.find()
  //     expect(postsInDatabase.length).toBe(1)
  //     expect(postsInDatabase[0].title).toBe(post.title)
  //     expect(postsInDatabase[0].content).toBe(post.content)
  //   });
    
  //   test('It should return a json with the author\'s posts', async () => {
  //     expect(response.body.title).toBe(data.title);
  //     expect(response.body.content).toBe(data.content);
  //   });
    
  //   /*test('The post should belong to the selected authors\' posts', async () => {
  //     const posts = await db.Author.getPosts(author._id)
  //     expect(posts.length).toBe(1)
  //     expect(posts[0].title).toBe(post.title)
  //     expect(posts[0].content).toBe(post.content)
  //   })*/
  // });

  afterAll(async () => {
    await cleanDb(db)
    await db.close()
  });