import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserCredentials } from '../reducer/loginReducer';
import { ShowNotification } from '../reducer/notificationReducer';
import { TextField, Button, OutlinedInput } from '@mui/material';
import { useFormControl as FormControl } from '@mui/material/FormControl';


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
            <h1>log in to application</h1>
            <div>
                <TextField
                    fullWidth
                    label='Username'
                    type='text'
                    name='Username'
                    value={userName}
                    onChange={({ target }) => setUserName(target.value)}
                >
                    <FormControl sx={{ width: '25ch' }}>
                        <OutlinedInput placeholder="Please enter text" />
                    </FormControl>
                </TextField>
                {/* <input
                    type='text'
                    name='Username'
                    value={userName}
                    onChange={({ target }) => setUserName(target.value)}
                /> */}
            </div>
            <div >
                <TextField
                    margin='normal'
                    style={{ width: '100%' }}
                    label='Password'
                    type='password'
                    name='Password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" type="submit" color='primary'>
                    login
                </Button>
            </div>
        </form>
    );
};