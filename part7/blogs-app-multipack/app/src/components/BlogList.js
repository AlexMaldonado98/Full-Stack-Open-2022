import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export const BlogList = () => {
    const blogs = useSelector(state => state.blogs);

    return (
        <div>
            {
                [...blogs].sort((a, b) => {
                    return b.likes - a.likes;
                }).map(blog => (
                    <div key={blog.id} className='container-blog'>
                        <Link to={`/blogs/${blog.id}`} >{`${blog.title}  ${blog.author}`}</Link>
                    </div>
                ))
            }
        </div>
    );
};