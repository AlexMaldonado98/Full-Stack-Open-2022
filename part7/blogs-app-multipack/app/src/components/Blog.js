import { useState } from 'react';
import jwt from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { addBlogWithNewLike } from '../reducer/blogsReducer';
import { ShowNotification } from '../reducer/notificationReducer';

const Blog = ({ blog, user }) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const token = jwt(user.token);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

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
            {`Title: ${blog.title} Author: ${blog.author}`}
            <button style={{ marginLeft: '10px' }} onClick={toggleVisibility} >{visible ? 'hide' : 'show'}</button>
            {visible === true ? (
                <>
                    <p>{`URL: ${blog.url}`}</p>
                    <p>{`Likes: ${blog.likes}`} <button className='button-like' onClick={addLike}>like</button> </p>
                    <p>{`Author: ${blog.author}`}</p>
                    {(blog.userOfBlog.id || blog.userOfBlog) === token.id ? <button onClick={deleteBlog} >Delete</button> : ''}
                </>
            )
                : ''}
        </div>
    );
};

export default Blog;