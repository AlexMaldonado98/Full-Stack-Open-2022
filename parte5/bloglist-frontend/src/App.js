import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { loginUser } from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );  
    }, []);

    useEffect(() => {
        const userCredentials = window.localStorage.getItem('userCredentials');
        if(userCredentials){
            const user = JSON.stringify(userCredentials);
            setUser(user);
        }
    },[]);

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            const user = await loginUser({username:userName, passwordHash:password});
            window.localStorage.setItem('userCredentials',JSON.stringify(user));
            setUser(user);
            setUserName('');
            setPassword('');
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('userCredentials');
        setUser(null);
        
    };

    if(user === null){
        return(
            <form onSubmit={handleLogin} >
        log in to application
                <div>Username
                    <input
                        type='text'
                        name='Username'
                        value={userName}
                        onChange={({target}) => setUserName(target.value)}
                    />
                </div>
                <div>password
                    <input
                        type='password'
                        name='Password'
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type='submit' >login</button>
            </form>
        );
    }

    return (
        <div>
            <span>{`user: ${user.username} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default App;
