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

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            const user = await loginUser({username:userName, passwordHash:password});
            setUser(user);
            setUserName('');
            setPassword('');
        } catch (error) {
            console.log(error.message);
        }
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
            <div>{`user: ${user.username}`}</div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default App;
