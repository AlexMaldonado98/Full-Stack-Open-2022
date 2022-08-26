const loginRouter = require('express').Router();
const config = require('../utils/config');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request,response,next) => {
    try {

        const { username, passwordHash } = request.body;
        const user = await User.findOne({ username });

        const exitsPassword = user !== null ? await bcrypt.compare(passwordHash,user.passwordHash) : false;

        if(!(user && exitsPassword)){
            return response.status(400).json({ error: 'the username or password is incorrect.' });
        }

        const tokenInfo = {
            username : user.username,
            id: user._id
        };

        const token = await jwt.sign(tokenInfo,config.SECRET,{ expiresIn: 60 * 60 * 24 });

        response.status(200).send({ token,username:user.username, name: user.name });
    } catch (error) {
        next(error);
    }
});

module.exports = loginRouter;