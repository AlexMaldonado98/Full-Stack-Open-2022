/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { LoginForm } from './components/LoginForm';
import { BlogForm } from './components/BlogForm';
import { Notifications } from './components/Notification';
import './App.css';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { getInitalBlogs } from './reducer/blogsReducer';
import { getUserFromStorage, logoutSesion } from './reducer/loginReducer';
import { onloadUsers } from './reducer/usersReducer';
import { Routes, Route } from 'react-router-dom';
import { Users } from './components/Users';
import { BlogList } from './components/BlogList';
import { User } from './components/User';
import { Menu } from './components/Menu';
import Container from '@mui/material/Container';


const App = () => {
    const user = useSelector(state => state.login);
    const toggleRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitalBlogs());
        dispatch(onloadUsers());
    }, []);

    useEffect(() => {
        const userCredentials = window.localStorage.getItem('userCredentials');
        if (userCredentials) {
            const user = JSON.parse(userCredentials);
            blogService.setToken(user.token);
            dispatch(getUserFromStorage(user));
        }
    }, []);

    if (user === null) {
        return (
            <Container style={{ display: 'flex',height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <Notifications />
                <LoginForm />
            </Container>
        );
    }

    return (
        <Container sx={{ padding:'10px' }} >
            <Notifications />
            <Menu />
            <h1>create new</h1>
            <Togglable button={'New Blog'} ref={toggleRef} >
                <BlogForm/>
            </Togglable>
            <h2>blogs</h2>
            <Routes>
                <Route path='/' element={<BlogList />} />
                <Route path='/users' element={<Users />} />
                <Route path='/users/:id' element={<User />} />
                <Route path='/blogs/:id' element={<Blog />} />
            </Routes>
        </Container>
    );
};

export default App;
