import jwt from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { addBlogWithNewLike } from '../reducer/blogsReducer';
import { ShowNotification } from '../reducer/notificationReducer';
import { useParams } from 'react-router-dom';
import { Comments } from './Comments';

const Blog = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id));
    const user = useSelector(state => state.login);

    if(!blog){
        return null;
    }

    const token = jwt(user.token);
    const addLike = () => {
        const newLike = {
            ...blog,
            likes: blog.likes + 1,
            userOfBlog: blog.userOfBlog.id
        };
        dispatch(addBlogWithNewLike(newLike));
    };

    const deleteBlog = () => {
        if(window.confirm('estas seguro de eliminar el blog para siempre')){
            try {
                dispatch(deleteBlog(blog.id));
                dispatch(ShowNotification('the blog was deleted', 5000));
            } catch (error) {
                dispatch(ShowNotification(`[ERROR] ${error.response.data.error}`, 5000));
            }
        }
    };

    return (
        <div className='container-blog'>
            <h1>{blog.title} {blog.author}</h1>
            <a href='#'>{blog.url}</a >
            <p>{`Likes: ${blog.likes}`} <button className='button-like' onClick={addLike}>like</button> </p>
            <p>{`added by ${blog.userOfBlog.name}`}</p>
            {blog.userOfBlog.id === token.id ? <button onClick={deleteBlog} >Delete</button> : ''}
            <div>Comments</div>
            <Comments blog={blog}/>
        </div>
    );
};

export default Blog;