import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserCredentials } from '../reducer/loginReducer';
import { ShowNotification } from '../reducer/notificationReducer';

export const LoginForm = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        if (userName && password !== '') {
            dispatch(loginUserCredentials({ userName, password }));
            setPassword('');
            setUserName('');
        } else {
            dispatch(ShowNotification('[ERROR] You need to fill in all the fields', 5000));
        }
    };


    return (
        <form onSubmit={handleSubmitLogin} >
            log in to application
            <div>Username
                <input
                    type='text'
                    name='Username'
                    value={userName}
                    onChange={({ target }) => setUserName(target.value)}
                />
            </div>
            <div>Password
                <input
                    type='password'
                    name='Password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit' id='login-button' >login</button>
        </form>
    );
};