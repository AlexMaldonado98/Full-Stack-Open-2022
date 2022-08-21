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
            return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
            
        }
    })
    const dispatch = useDispatch(); 
    
    const vote = (anecdote) => {
        const {id} = anecdote
        dispatch(addVote(anecdote))
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
};