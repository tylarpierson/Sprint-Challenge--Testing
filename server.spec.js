const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
  const newGame = { title: 'Harry Potter', genre: 'sci-fi', releaseDate: '021208'};
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('POST', () => {
    it('should create a new game', async() => {
      request(server)
        .post('/api/games')
        .send(newGame)
        .expect('Content-Type', /json/)
        .expect(201)
    });
    it('should throw an error when a new game POST does not meet all requirements', () => {
      const noTitle = { genre: 'sci-fi', releaseDate: '021208'};
      const noGenre = { title: 'Harry Potter', releaseDate: '021208'};
      request(server)
        .post('/api/games')
        .send(noTitle)
        .expect('Content-Type', /json/)
        .expect(500)

      request(server)
        .post('/api/games')
        .send(noGenre)
        .expect('Content-Type', /json/)
        .expect(500)
    });
    it('should allow a user to POST a game without a release date', () => {
      const noRelease = { title: 'Harry Potter', genre: 'sci-fi'};
      request(server)
        .post('/api/games')
        .send(noRelease)
        .expect('Content-Type', /json/)
        .expect(201)
    });
  })
  // test the GET here

  // Test the DELETE here
});
