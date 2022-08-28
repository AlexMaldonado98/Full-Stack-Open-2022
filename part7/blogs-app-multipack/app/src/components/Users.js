import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onloadUsers } from '../reducer/usersReducer';

export const Users = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(onloadUsers());
    }, []);
    console.log(users);
    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <td><strong>User</strong></td>
                        <td style={{ borderLeft: 'solid 1px black', paddingLeft:'10px' }}><strong>Blogs created</strong></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td style={{ borderLeft: 'solid 1px black', paddingLeft:'10px' }}> {user.blogsOfUser.length}</td>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};