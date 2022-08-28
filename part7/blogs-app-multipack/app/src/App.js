/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { loginUser } from './services/login';
import { LoginForm } from './components/LoginForm';
import { BlogForm } from './components/BlogForm';
import { Notifications } from './components/Notification';
import './App.css';
import Togglable from './components/Togglable';
import { ShowNotification } from './reducer/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, getInitalBlogs } from './reducer/blogsReducer';
import { getUserFromStorage, loginUserCredentials, logoutSesion } from './reducer/loginReducer';
import { Routes, Route } from 'react-router-dom';
import { Users } from './components/Users';
import { BlogList } from './components/BlogList';


const App = () => {
    const user = useSelector(state => state.login);
    const toggleRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInitalBlogs());
    }, []);

    useEffect(() => {
        const userCredentials = window.localStorage.getItem('userCredentials');
        if (userCredentials) {
            const user = JSON.parse(userCredentials);
            blogService.setToken(user.token);
            dispatch(getUserFromStorage(user));
        }
    }, []);

    const handleLogin = async (userName, password) => {
        if (userName && password !== '') {
            dispatch(loginUserCredentials({ userName, password }));
        } else {
            dispatch(ShowNotification('[ERROR] You need to fill in all the fields', 5000));
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('userCredentials');
        dispatch(logoutSesion());
    };

    if (user === null) {
        return (
            <>
                <Notifications />
                <LoginForm handleLogin={handleLogin} />
            </>
        );
    }

    return (
        <div>
            <Notifications />
            <span>{`user: ${user.username} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
            <h1>create new</h1>
            <Togglable button={'New Blog'} ref={toggleRef} >
                <BlogForm/>
            </Togglable>
            <h2>blogs</h2>
            <Routes>
                <Route path='/' element={<BlogList />} />
                <Route path='/users' element={<Users />} />
            </Routes>
        </div>
    );
};

export default App;
