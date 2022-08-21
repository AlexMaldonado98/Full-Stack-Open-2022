import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { hideNotification, showNotification } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch(); 
    
    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
        dispatch(showNotification(`you voted ${anecdotes.find(anecdote => anecdote.id === id).content}`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000);
    }

    return (
        <>
            {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
};