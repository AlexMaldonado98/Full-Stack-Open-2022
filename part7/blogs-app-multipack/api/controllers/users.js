const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request,response) => {
    const users = await User.find({}).populate('blogsOfUser',{ title: 1, blogsOfUser: 1 });
    response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
    const { username,name,passwordHash } = request.body;

    if(!(username && passwordHash)){
        return response.status(400).send({ error:'the password and username is required' });
    }

    const userExistent = await User.findOne({ username });
    if(userExistent){
        return response.status(400).json({ error: 'the username is in use' });
    }

    if(username.length < 3 || passwordHash.length < 3){
        return response.status(400).json({ error: 'username and password are too short: the minimum is 3 characters' });
    }


    const saltRounds = 10;
    const passwordWithHash = await bcrypt.hash(passwordHash,saltRounds);

    const newUser = new User({
        username: username,
        name: name,
        passwordHash: passwordWithHash
    });

    await newUser.save();
    response.status(201).json(newUser);
});

module.exports = usersRouter;
