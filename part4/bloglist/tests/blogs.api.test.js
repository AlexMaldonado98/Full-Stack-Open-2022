const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const { blogs, getBlogsInDB } = require('./test_helper');
const Blog = require('../models/blog');
const { server } = require('../index');

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

describe('adding', () => {
    test('a new blog', async () => {
        const newBlog = {
            title: 'myFirstApp',
            author: 'Alex',
            url: 'www.google.com',
            likes: '33'
        };

        await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

        const result = await api.get('/api/blogs').expect(200);

        expect(result.body).toHaveLength(blogs.length + 1);

        const objTitle = result.body.map(blog => blog.title);
        expect(objTitle).toContain('myFirstApp');
    });

    test('a blog without likes', async () => {
        const newBlog = {
            title: 'hasNoLikes',
            author: 'Unknow',
            url: 'www.notLikes.com'
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsInDB = await getBlogsInDB();
        expect(blogsInDB).toHaveLength(blogs.length + 1);
        expect(blogsInDB[blogsInDB.length - 1].likes).toBe(0);
    });


});

afterAll(() => {
    mongoose.connection.close();
    server.close();
});