const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('userOfBlog',{ username:1, name:1 });
    response.json(blogs);
});
blogsRouter.get('/:id', async (request, response) => {
    const blogs = await Blog.findById(request.params.id);
    response.json(blogs);
});

blogsRouter.post('/',userExtractor,async (request, response,next) => {

    try{
        const blog = request.body;
        const user = request.user;

        const newBlog = await new Blog({
            title: blog.title,
            author: blog.author || 'Unknown',
            url: blog.url,
            likes: blog.likes || 0,
            userOfBlog: user._id
        }).populate('userOfBlog',{ username:1, name:1 });

        const result = await newBlog.save();
        user.blogsOfUser = user.blogsOfUser.concat(result._id);
        await user.save();
        response.status(201).json(result);
    }catch(error){
        next(error);
    }
});

blogsRouter.delete('/:id',userExtractor,async (request,response,next) => {
    try {
        const { id } = request.params;
        const user = request.user;
        const blogToDelate = await Blog.findById(id);
        if(blogToDelate === null){
            return response.status(404).json({ error: 'the blog does not exist' });
        }
        if(blogToDelate.userOfBlog.toString() === user._id.toString()){
            await Blog.deleteOne({ _id: id });
            response.status(204).end();
        }else{
            response.status(401).json({ error: 'unauthorized operation' });
        }
    } catch (error) {
        next(error);
    }
});

blogsRouter.put('/:id', async (request, response,next) => {

    try{
        const blog = request.body;
        const updateBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true }).populate('userOfBlog',{ username: 1, name: 1 });
        response.status(200).json(updateBlog);

    }catch(error){
        next(error);
    }
});

blogsRouter.post('/:id/comments', async (request,response, next) => {
    try {
        const { body } = request;

        const blog = await Blog.findById(body.id);

        blog.comments = [...blog.comments, body.comment];

        const result = await Blog.findByIdAndUpdate(blog.id,blog,{ new: true }).populate('userOfBlog',{ username: 1,name: 1 });

        console.log(result);

        response.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter;