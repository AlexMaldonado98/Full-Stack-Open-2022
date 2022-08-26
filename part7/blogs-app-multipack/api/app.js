const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const app = express();
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const MONGODB_URI = config.MONGODB_URI;

morgan.token('data', (request) => request.method === 'POST' ? JSON.stringify(request.body) : '' );

logger.info('connecting to mongodb');

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch(() => {
        console.log('[ERROR] when trying to connect to mongodb');
    });

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'));
app.use(express.static('../app/build'));
app.use(middleware.tokenExtractor);

app.use('/api/blogs',blogsRouter);
app.use('/api/users',usersRouter);
app.use('/api/login',loginRouter);

if(process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testingRouter');
    app.use('/api/testing',testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;