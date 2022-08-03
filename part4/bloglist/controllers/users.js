const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request,response) => {
    const users = await User.find({});
    response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
    const body = request.body;
    if(!(body.username && body.passwordHash)){
        return response.status(400).send({ error:'the password and username is required' });
    }
    console.log('entre');
    const saltRounds = 10;
    const passwordWithHash = await bcrypt.hash(body.passwordHash,saltRounds);

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordWithHash
    });

    await newUser.save();
    response.status(201).json(newUser);
});

module.exports = usersRouter;
