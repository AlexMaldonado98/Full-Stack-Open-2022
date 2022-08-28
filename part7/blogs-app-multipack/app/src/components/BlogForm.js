import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ShowNotification } from '../reducer/notificationReducer';
import { addBlog } from '../reducer/blogsReducer';

export const BlogForm = () => {
    const [newBlog, setNewBlog] = useState({ title:'',author:'',url:'' });
    const dispatch = useDispatch();

    const handleFormChange = ({ target }) => {
        const { name,value } = target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    const handleBlog = (event) => {
        event.preventDefault();
        try {
            dispatch(addBlog({ title:newBlog.title, author:newBlog.author, url:newBlog.url }));
            dispatch(ShowNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 5000));
            setNewBlog({ title:'',author:'',url:'' });
        } catch (error) {
            if (error.response.data.error === 'the token expired') {
                dispatch(ShowNotification('[ERROR] Sesion caducada, vuelva a iniciar sesion', 5000));
                return;
            }
            dispatch(ShowNotification('[ERROR] the title and url is required', 5000));
        }
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