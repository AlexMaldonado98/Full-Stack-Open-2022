const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('/', async (request, response,next) => {

    try{
        const blog = request.body;
        const newBlog = new Blog({
            'title': blog.title,
            'author': blog.author,
            'url': blog.url,
            'likes': blog.likes || 0
        });

        const result = await newBlog.save();
        response.status(201).json(result);

    }catch(error){
        next(error);
    }
});

blogsRouter.delete('/:id',async (request,response,next) => {
    try {
        const { id } = request.params;
        await Blog.findByIdAndDelete(id);
        response.status(204).end();

    } catch (error) {
        next(error);
    }
});

blogsRouter.put('/:id', async (request, response,next) => {

    try{
        const blog = request.body;
        const updateBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true });
        response.status(200).json(updateBlog);

    }catch(error){
        next(error);
    }
});

module.exports = blogsRouter;