const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { userIdExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('userOfBlog',{ username:1, name:1 });
    response.json(blogs);
});

blogsRouter.post('/',userIdExtractor ,async (request, response,next) => {

    try{
        const blog = request.body;
        const user = await User.findById(request.userId);

        const newBlog = new Blog({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes || 0,
            userOfBlog: request.userId,
        });

        const result = await newBlog.save();
        user.blogsOfUser = user.blogsOfUser.concat(result._id);
        await user.save();
        response.status(201).json(result);
    }catch(error){
        next(error);
    }
});

blogsRouter.delete('/:id',userIdExtractor,async (request,response,next) => {
    try {
        const { id } = request.params;
        const blogToDelate = await Blog.findById(id);
        if(blogToDelate === null){
            return response.status(404).json({ error: 'the blog does not exist' });
        }
        if(blogToDelate.userOfBlog.toString() === request.userId){
            await Blog.findByIdAndDelete(id);
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
        const updateBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true });
        response.status(200).json(updateBlog);

    }catch(error){
        next(error);
    }
});

module.exports = blogsRouter;