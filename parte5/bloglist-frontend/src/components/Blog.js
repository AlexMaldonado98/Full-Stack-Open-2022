import { useState } from 'react';

const Blog = ({ blog, updateLikes }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const addLike = () => {
        const newLike = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            userOfBlog: blog.userOfBlog.idp
        };
        updateLikes(blog.id,newLike);
    };

    return (
        <div className='container-blog'>
            {`Title: ${blog.title}`}
            <button style={{marginLeft: '10px'}} onClick={toggleVisibility} >{visible ? 'hide' : 'show'}</button>
            {visible === true ? (
                <>
                    <p>{`URL: ${blog.url}`}</p>
                    <p>{`Likes: ${blog.likes}`} <button onClick={addLike}>like</button> </p>
                    <p>{`Author: ${blog.author}`}</p>
                </>
            )
                : ''}
        </div>
    );
};

export default Blog;