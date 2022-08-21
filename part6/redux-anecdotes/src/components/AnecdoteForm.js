import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
    const dispatch = useDispatch() 

    const newAnecdote =async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(addAnecdote(content));
        dispatch(showNotification(`the anecdote ${content} added with success`,5))
    };

    return (
        <form onSubmit={newAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    );
};