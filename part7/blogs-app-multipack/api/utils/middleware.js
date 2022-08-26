const logger = require('./logger');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
    logger.info(error.name);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error: 'token is invalid or is missing' });
    } else if (error.name === 'TokenExpiredError'){
        return response.status(401).json({ error: 'the token expired' });
    }

    next(error);
};

const tokenExtractor = (request,response,next) => {
    const authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        request.token = authorization.split(' ')[1];
    }
    next();
};

const userExtractor = async (request,response,next) => {
    try {
        const decryptionToken = jwt.verify(request.token,config.SECRET);
        console.log(typeof decryptionToken);
        if(!(decryptionToken.id && request.token)){
            return response.status(400).json({ error: 'token is invalid or is missing' });
        }

        request.user = await User.findById(decryptionToken.id);
        next();
    } catch (error) {
        next(error);
    }
};



module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
};