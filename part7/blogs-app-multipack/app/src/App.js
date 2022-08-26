import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { loginUser } from './services/login';
import { LoginForm } from './components/LoginForm';
import { BlogForm } from './components/BlogForm';
import { Notifications } from './components/Notification';
import './App.css';
import Togglable from './components/Togglable';


const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);

    const toggleRef = useRef();

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );
    }, []);

    useEffect(() => {
        const userCredentials = window.localStorage.getItem('userCredentials');
        if (userCredentials) {
            const user = JSON.parse(userCredentials);
            blogService.setToken(user.token);
            setUser(user);
        }
    }, []);

    const handleLogin = async (userName, password) => {
        if (userName && password !== '') {
            try {
                const user = await loginUser({ username: userName, passwordHash: password });
                window.localStorage.setItem('userCredentials', JSON.stringify(user));
                blogService.setToken(user.token);
                setUser(user);
                setMessage('Login success');
                setTimeout(() => {
                    setMessage(null);
                }, 3000);
            } catch (error) {
                setMessage(`[ERROR] ${error.response.data.error}`);
                setTimeout(() => {
                    setMessage(null);
                }, 3000);
            }
        } else {
            setMessage('[ERROR] You need to fill in all the fields');
            setTimeout(() => {
                setMessage(null);
            }, 5000);

        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('userCredentials');
        setUser(null);
    };

    const handleNewBlog = async (title, author, url) => {
        try {
            const response = await blogService.create({ title, author, url });
            setBlogs([...blogs, response]);
            setMessage(`A new blog ${response.title} by ${response.author} added`);
            toggleRef.current.toggleVisibility();
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        } catch (error) {
            if(error.response.data.error === 'the token expired'){
                setMessage('[ERROR] Sesion caducada, vuelva a iniciar sesion');
                setTimeout(() => {
                    setMessage(null);
                    window.localStorage.removeItem('userCredentials');
                    setUser(null);
                }, 5000);
                return;
            }

            setMessage('[ERROR] the title and url is required');
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    const updateLikes = async (id, newBlogLike) => {
        try {
            const response = await blogService.update(id, newBlogLike);
            setBlogs(blogs.map(blog => blog.id === response.id ? response : blog));
        } catch (error) {
            console.log(error.response);
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }


    };

    const handleBlogDelete = async (id) => {
        try {
            await blogService.deleteBlog(id);
            setBlogs(blogs.filter(blog => blog.id !== id));
            setMessage('the blog was deleted');
            setTimeout(() => {
                setMessage(null);
            }, 5000);

        } catch (error) {
            setMessage(`[ERROR] ${error.response.data.error}`);
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    if (user === null) {
        return (
            <>
                <Notifications message={message} />
                <LoginForm handleLogin={handleLogin} />
            </>
        );
    }

    return (
        <div>
            <Notifications message={message} />
            <span>{`user: ${user.username} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
            <h1>create new</h1>
            <Togglable button={'New Blog'} ref={toggleRef} >
                <BlogForm handleNewBlog={handleNewBlog} />
            </Togglable>
            <h2>blogs</h2>
            {
                blogs.sort((a, b) => {
                    return b.likes - a.likes;
                }).map(blog =>
                    <Blog key={blog.id} blog={blog} updateLikes={updateLikes} user={user} handleBlogDelete={handleBlogDelete} />
                )
            }
        </div>
    );
};

export default App;
