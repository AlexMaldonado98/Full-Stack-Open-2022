const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const api = supertest(app);
const { blogs, getBlogsInDB } = require('./test_helper');
const Blog = require('../models/blog');
const { server } = require('../index');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');


beforeEach(async () => {
    await Blog.deleteMany({});
    for (let b of blogs) {
        let newBlog = new Blog(b);
        await newBlog.save();
    }
});

describe('Initial blogs',() => {
    test('are required', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);

        console.log('GET',response);
    });

    test('are called id', async () => {
        const { body } = await api.get('/api/blogs');

        const ids = body.map(blog => blog.id);

        for (const id of ids) {
            expect(id).toBeDefined();
        }
    });
});

describe('Adding', () => {
    let token = null;
    beforeAll(async () => {
        await User.deleteMany({});
        const passwordWithHash = await bcrypt.hash('testpass',10);
        const user = await new User({ username:'testname', passwordHash:passwordWithHash,name:'testname' }).save();
        const infoToken = { username:user.username,id: user._id };
        return token = jwt.sign(infoToken,config.SECRET);
    });

    test('a new blog', async () => {
        const newBlog = {
            title: 'myFirstApp',
            author: 'Alex',
            url: 'www.google.com',
            likes: '33'
        };

        const response2 = await api.
            post('/api/blogs')
            .set('Authorization',`bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const result = await api.get('/api/blogs').expect(200);
        console.log('POST',response2.body);

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
            .set('Authorization',`bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsInDB = await getBlogsInDB();
        expect(blogsInDB).toHaveLength(blogs.length + 1);
        expect(blogsInDB[blogsInDB.length - 1].likes).toBe(0);
    });

    test('a blog with missing content', async () => {
        const newBlog = {
            author: 'missing',
            url: 'www.missingcontent.com'
        };

        await api
            .post('/api/blogs')
            .set('Authorization',`bearer ${token}`)
            .send(newBlog)
            .expect(400);

        const blogsInDB = await getBlogsInDB();
        expect(blogsInDB).toHaveLength(blogs.length);
        expect(blogsInDB[blogs.length-1].author).not.toContain('missing');
    });


});

describe('Delete',() => {
    let token = null;
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordWithHash = await bcrypt.hash('12345', 10);
        const user = await new User({ username: 'name', passwordHash: passwordWithHash, name: 'NameOfUser' }).save();

        const infoToken = { username: user.username, id: user._id };
        token = jwt.sign(infoToken, config.SECRET);

        const newBlog = {
            title: 'ObjectiveDelete',
            author: 'DeleteAuthor',
            url: 'www.google.com',
            likes:9
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });
    test('a blog by id', async () => {
        const blogDelete = await Blog.find({});

        await api
            .delete(`/api/blogs/${blogDelete[blogDelete.length - 1]._id}`)
            .set('Authorization',`bearer ${token}`)
            .expect(204);

        const blogsInDB = await getBlogsInDB();

        expect(blogsInDB[blogsInDB.length - 1].title).toContain(blogs[blogs.length-1].title);
        expect(blogsInDB[blogsInDB.length - 1].title).not.toContain(blogDelete[blogDelete.length - 1].title);

    });

    test('a blog with a malformad id', async () => {
        const blogDelete = blogs[0];

        await api
            .delete(`/api/blogs/${blogDelete._id}ddd`)
            .set('Authorization',`bearer ${token}`)
            .expect(400);

        const blogsInDB = await getBlogsInDB();
        expect(blogsInDB).toHaveLength(blogs.length+1);

    });
});

describe('update a blog', () => {
    test('updatign likes',async () => {
        let blogsInDB = await getBlogsInDB();
        const blogToUpdate = blogsInDB[0];

        const updateBlog = {
            title: 'im new',
            likes: 100
        };

        const { body } = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updateBlog)
            .expect(200);
        expect(body.title).toContain('im new');
        blogsInDB = await getBlogsInDB();
        expect(blogsInDB[0].likes).toBe(100);
    });
});

afterAll(() => {
    mongoose.connection.close();
    server.close();
});