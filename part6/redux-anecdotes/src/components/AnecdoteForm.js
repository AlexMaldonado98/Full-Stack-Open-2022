import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { hideNotification, showNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../services/anecdotes";

export const AnecdoteForm = () => {
    const dispatch = useDispatch() 

    const newAnecdote =async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        const result = await createAnecdote(content);
        dispatch(addAnecdote(result));
        dispatch(showNotification(`the anecdote ${content} added with success`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000);
    };

    return (
        <form onSubmit={newAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    );
};