import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { addComment } from '../reducer/blogsReducer';

export const Comments = ({ blog }) => {
    const dispatch = useDispatch();
    const { reset: resetInputComment, ...commment } = useField('text');

    const handleComment = (event) => {
        event.preventDefault();
        dispatch(addComment(blog, commment.value));
        resetInputComment();
    };

    return (
        <div>
            <form onSubmit={handleComment}>
                <input name='comment' placeholder='white your comment' {...commment} />
                <button> add comment</button>
            </form>
            <ul>
                {blog.comments.map((comment,index) => <li key={index}>{comment}</li>)}
            </ul>
        </div>
    );
};