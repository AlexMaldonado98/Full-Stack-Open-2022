import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutSesion } from '../reducer/loginReducer';
export const Menu = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login);

    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('userCredentials');
        dispatch(logoutSesion());
    };

    return (
        <div>
            <Link style={{ paddingInline: '3px' }} to='/'>Blogs</Link>
            <Link style={{ paddingInline: '3px' }} to='/users'>Users</Link>
            <span> / {`user: ${user.username} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
        </div>
    );
};