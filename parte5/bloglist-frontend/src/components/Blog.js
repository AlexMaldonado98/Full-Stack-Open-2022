import { useState } from 'react';

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div className='container-blog'>
            {`Title: ${blog.title}`}
            <button style={{marginLeft: '10px'}} onClick={toggleVisibility} >{visible ? 'hide' : 'show'}</button>
            {visible === true ? (
                <>
                    <p>{`URL: ${blog.url}`}</p>
                    <p>{`Likes: ${blog.likes}`} <button>like</button>  </p>
                    <p>{`Author: ${blog.author}`}</p>
                </>
            )
                : ''}
        </div>
    );
};

export default Blog;