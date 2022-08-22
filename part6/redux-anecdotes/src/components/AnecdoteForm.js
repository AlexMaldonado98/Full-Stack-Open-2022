import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

    const newAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        props.addAnecdote(content);
        props.showNotification(`the anecdote ${content} added with success`,5);
    };

    return (
        <form onSubmit={newAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    );
};

const anotherRandomName = {
    addAnecdote,
    showNotification
};

export default connect(null,anotherRandomName)(AnecdoteForm);