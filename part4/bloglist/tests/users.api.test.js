const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const { users_initials, getUsersInDB } = require('./test_helper');
const { server } = require('../index');
const mongoose = require('mongoose');

beforeEach(async () => {
    await User.deleteMany({});
    for (let user of users_initials) {
        let newUser = new User(user);
        await newUser.save();
    }
});

describe('Get users',() => {
    test('Initial users' , async () => {
        const usersAtStart = await getUsersInDB();

        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(users_initials).toHaveLength(usersAtStart.length);

    });
});

describe('Adding user',() => {
    test('with password hash and return', async () => {
        const usersAtStart = await getUsersInDB();
        const newUser = {
            username: 'Alex With hash',
            name: 'Alex Hash name',
            passwordHash: '12345'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const usersAtEnd = await getUsersInDB();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        expect(usersAtEnd[usersAtEnd.length-1].username).toContain('Alex With hash');
    });
});

afterAll(() => {
    server.close();
    mongoose.connection.close();
});