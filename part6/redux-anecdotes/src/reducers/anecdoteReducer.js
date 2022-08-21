export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0
    }
  }
};

export const initAnecdotes = (anecdotes) => {
  return {
    type:'INIT',
    data:{
      anecdotes
    }
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE' :
      const id = action.data.id;
      const anecdoteToVote = state.find(acnecodote => acnecodote.id === id);
      const updateAnecdote = {...anecdoteToVote,votes: anecdoteToVote.votes + 1}

      return state.map(anecdote => anecdote.id === id ? updateAnecdote : anecdote);
    case 'NEW_ANECDOTE':
      return [...state,action.data];

    case 'INIT':
      return action.data.anecdotes

    default:
      return state
  }
}

export default reducer