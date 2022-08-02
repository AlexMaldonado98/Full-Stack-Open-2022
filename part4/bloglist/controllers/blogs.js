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
        'likes': blog.like
    });

    const result = await newBlog.save();
    response.status(200).json(result);
});

module.exports = blogsRouter;