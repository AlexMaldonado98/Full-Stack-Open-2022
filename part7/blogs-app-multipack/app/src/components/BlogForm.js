import { useState } from 'react';

export const BlogForm = ({ handleNewBlog }) => {
    const [newBlog, setNewBlog] = useState({ title:'',author:'',url:'' });

    const handleFormChange = ({ target }) => {
        const { name,value } = target;
        setNewBlog({ ...newBlog, [name]:value });
    };

    const handleBlog = (event) => {
        event.preventDefault();
        handleNewBlog(newBlog.title,newBlog.author,newBlog.url);
        setNewBlog({ title:'',author:'',url:'' });
    };

    return(
        <form onSubmit={handleBlog} >
    log in to application
            <div>title
                <input
                    type='text'
                    name='title'
                    value={newBlog.title}
                    onChange={handleFormChange}
                />
            </div>
            <div>author
                <input
                    type='text'
                    name='author'
                    value={newBlog.author}
                    onChange={handleFormChange}
                />
            </div>
            <div>url
                <input
                    type='text'
                    name='url'
                    value={newBlog.url}
                    onChange={handleFormChange}
                />
            </div>
            <button type='submit'>create blog</button>
        </form>
    );
};