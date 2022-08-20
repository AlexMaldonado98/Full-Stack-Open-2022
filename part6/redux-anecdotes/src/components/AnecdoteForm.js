import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
    const dispatch = useDispatch() 

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(addAnecdote(content));
    };

    return (
        <form onSubmit={newAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    );
};