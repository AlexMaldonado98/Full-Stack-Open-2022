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

describe('Initial blogs',() => {
    test('are required', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('are called id', async () => {
        const { body } = await api.get('/api/blogs');

        const ids = body.map(blog => blog.id);

        for (const id of ids) {
            expect(id).toBeDefined();
        }
    });
});

afterAll(() => {
    mongoose.connection.close();
});