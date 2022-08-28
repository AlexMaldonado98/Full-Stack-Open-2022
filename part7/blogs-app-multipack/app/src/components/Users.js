import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Users = () => {
    const users = useSelector(state => state.users);

    if(!users){
        return null;
    }
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
                                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                                <td style={{ borderLeft: 'solid 1px black', paddingLeft:'10px' }}>{user.blogsOfUser.length}</td>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};