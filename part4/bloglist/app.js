const config = require('./utils/config');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const app = express();
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoUrl = config.MONBODB_URI;
morgan.token('data', (request) => request.method === 'POST' ? JSON.stringify(request.body) : '');

logger.info('connecting to mongodb');


mongoose.connect(mongoUrl)
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch(() => {
        console.log('[ERROR] when trying to connect to mongodb');
    });

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] :response-time ms :data'));

app.use('/api/blogs',blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;