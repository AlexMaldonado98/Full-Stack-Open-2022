const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const { blogs } = require('./test_helper');
const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});
    for (let b of blogs) {
        let newBlog = new Blog(b);
        await newBlog.save();
    }
});

describe('GET Blogs',() => {
    test('all blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
});

afterAll(() => {
    mongoose.connection.close();
});