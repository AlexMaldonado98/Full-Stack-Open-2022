require('dotenv').config();

const cors = require('cors');
const { request } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
morgan.token('data', () => request.method === 'POST' ? JSON.stringify(request.body) : '');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
    }
});

const Blog = mongoose.model('Blog', blogSchema);



const mongoUrl = process.env.MONGODB_URI;

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

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs);
        });
});

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});