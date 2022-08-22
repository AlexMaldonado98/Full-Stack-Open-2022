import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {

    return (
        <>
            {[...props.anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div >
                        {anecdote.content}
                    </div> 
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            props.addVote(anecdote);
                            props.showNotification(`you voted ${anecdote.content}`,5);
                        }}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    if(!state.filter){
        return {anecdotes: state.anecdotes}
    }else{
        const anecdotes = state.anecdotes
        return {anecdotes: anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))}
        
    }
}

const mapDispatchToState = {
    addVote,
    showNotification
}

export default connect(mapStateToProps,mapDispatchToState)(AnecdoteList);