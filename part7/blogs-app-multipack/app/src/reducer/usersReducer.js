import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/users';

const usersReducer = createSlice({
    name: 'users',
    initialState: [],
    reducers:{
        setUsers(state,action){
            return action.payload;
        }
    }
});

export const { setUsers } = usersReducer.actions;

export const onloadUsers = () => {
    return async (dispatch) => {
        const users = await getAllUsers();
        dispatch(setUsers(users));
    };
};

export default  usersReducer.reducer;