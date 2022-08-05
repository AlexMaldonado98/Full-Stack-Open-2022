import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { loginUser } from './services/login';
import { LoginForm } from './components/LoginForm';
import { BlogForm } from './components/BlogForm';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );  
    }, []);

    useEffect(() => {
        const userCredentials = window.localStorage.getItem('userCredentials');
        if(userCredentials){
            const user = JSON.parse(userCredentials);
            blogService.setToken(user.token);
            setUser(user);
        }
    },[]);

    const handleLogin = async (userName,password) => {
        try {
            const user = await loginUser({username:userName, passwordHash:password});
            window.localStorage.setItem('userCredentials',JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('userCredentials');
        setUser(null);
    
    };

    const handleNewBlog = async (title,author,url) => {
        const response = await blogService.create({title,author,url});
        setBlogs([...blogs,response]);
    };

    if(user === null){
        return(
            <LoginForm handleLogin={handleLogin} />
        );
    }

    return (
        <div>
            <span>{`user: ${user.username} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
            <h1>create new</h1>
            <BlogForm handleNewBlog={handleNewBlog} />
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default App;
