const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const blog = request.body;
    const newBlog = new Blog({
        'title': blog.title,
        'author': blog.author,
        'url': blog.url,
        'likes': blog.likes || 0
    });

    const result = await newBlog.save();
    response.status(201).json(result);
});

module.exports = blogsRouter;