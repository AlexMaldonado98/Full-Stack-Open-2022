import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const User = () => {
    const { id } = useParams();

    const userObjetive = useSelector(state => state.users.find(user => user.id === id));

    if (!userObjetive) {
        return null;
    }

    return (
        <div>
            <h1>NAME: {userObjetive.name}</h1>
            <h2>Username: {userObjetive.username}</h2>
            <div>
                <h2>added blogs</h2>
                <ul>
                    {userObjetive.blogsOfUser.map(blog => <li key={blog.id}>{blog.title}</li>)}
                </ul>
            </div>
        </div>
    );
};