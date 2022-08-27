import { createSlice } from '@reduxjs/toolkit';
import servicesBLogs from '../services/blogs';

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        initialBlogs(state,action){
            state = action.payload;
            return state;
        },
        newBlog(state,action){
            const newState = [...state,action.payload];
            return newState;
        }

    }
});
export const { initialBlogs, newBlog } = blogSlice.actions;

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

export default blogSlice.reducer;
