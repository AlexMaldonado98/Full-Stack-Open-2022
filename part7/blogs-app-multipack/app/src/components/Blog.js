import { useState } from 'react';
import jwt from 'jwt-decode';

const Blog = ({ blog, updateLikes, user, handleBlogDelete }) => {
    const [visible, setVisible] = useState(false);

    const token = jwt(user.token);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const addLike = () => {
        const newLike = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            userOfBlog: blog.userOfBlog.id
        };
        updateLikes(blog.id,newLike);
    };

    const deleteBlog = () => {
        if(window.confirm('estas seguro de eliminar el blog para siempre')){
            handleBlogDelete(blog.id);
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