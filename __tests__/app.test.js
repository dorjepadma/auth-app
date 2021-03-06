require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('auth routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'trixie', password: 'trixietricks' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'trixie',
          __v: 0
        });
      });
  });
  it('logs in a user', async() => {
    await User.create({ username: 'trixie', password: 'trixietricks' });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'trixie', password: 'trixietricks' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'trixie',
          __v: 0
        });
      });
  });
});
