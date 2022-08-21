import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { hideNotification, showNotification } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => {
        if(!filter){
            return state.anecdotes
        }else{
            console.log('emtre');
            const anecdotes = state.anecdotes
            console.log(anecdotes[0].content);
            return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter) ? anecdote : '')
        }
    })
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
                    <div >
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