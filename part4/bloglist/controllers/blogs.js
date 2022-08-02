const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {

    try{
        const blog = request.body;
        const newBlog = await new Blog({
            'title': blog.title,
            'author': blog.author,
            'url': blog.url,
            'likes': blog.likes || 0
        });

        const result = await newBlog.save();
        response.status(201).json(result);

    }catch(error){
        response.status(400).end();
    }
});

module.exports = blogsRouter;