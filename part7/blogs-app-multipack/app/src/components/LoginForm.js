import { useState } from 'react';

export const LoginForm = ({ handleLogin }) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        handleLogin(userName,password);
        setPassword('');
        setUserName('');
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