import { useSelector } from 'react-redux';
import Blog from './Blog';

export const BlogList = () => {
    const blogs = useSelector(state => state.blogs);
    const user = useSelector(state => state.login);

    return (
        <div>
            {
                [...blogs].sort((a, b) => {
                    return b.likes - a.likes;
                }).map(blog =>
                    <Blog key={blog.id} blog={blog} user={user}/>
                )
            }
        </div>
    );
};