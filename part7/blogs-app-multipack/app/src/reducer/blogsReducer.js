import { createSlice } from '@reduxjs/toolkit';
import servicesBLogs from '../services/blogs';
import { ShowNotification } from './notificationReducer';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        initialBlogs(state,action){
            state = action.payload;
            return state;
        },
        newBlog(state,action){
            return [...state,action.payload];
        },
        addLike(state,action){
            const { id } = action.payload;
            return state.map(blog => blog.id === id ? action.payload : blog);
        },
        deleteB(state,action){
            const id = action.payload;
            return state.filter(blog => blog.id !== id);
        },
        addCommentInBlog(state,action){
            console.log(action.payload);
            const { id } = action.payload;
            return state.map(blog => blog.id === id ? action.payload : blog);
        }


    }
});

export const { initialBlogs, newBlog, addLike, deleteB, addCommentInBlog } = blogSlice.actions;

export const getInitalBlogs = () => {
    return async (dispatch) => {
        const result = await servicesBLogs.getAll();
        dispatch(initialBlogs(result));
    };
};

export const addBlog = (objValues) => {
    return async (dispatch) => {
        const result = await servicesBLogs.create(objValues);
        dispatch(newBlog(result));
    };
};

export const addBlogWithNewLike = (blogWithNewLike) => {
    return async (dispatch) => {
        try {
            const result = await servicesBLogs.update(blogWithNewLike.id,blogWithNewLike);
            dispatch(addLike(result));
        } catch (error) {
            dispatch(ShowNotification(error,5000));
        }
    };
};

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await servicesBLogs.deleteBlog(id);
        dispatch(deleteB(id));
    };
};

export const addComment = (blog,comment) => {
    return async (dispatch) => {
        const data = {
            id: blog.id,
            comment
        };
        const result = await servicesBLogs.addComment(data);
        console.log(result);
        dispatch(addCommentInBlog(result));
    };
};

export default blogSlice.reducer;
