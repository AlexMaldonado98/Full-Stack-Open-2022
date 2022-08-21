import { createAnecdote, getAll, updateAnecdote } from "../services/anecdotes";

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const result = await updateAnecdote(anecdote);
    dispatch({
      type: 'VOTE',
      data: {
        id : result.id
      }
    })
  }
}

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createAnecdote(content);
    dispatch({
      type:'NEW_ANECDOTE',
      data: {
        anecdote: newAnecdote
      }
    })

  }
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(
      {
        type: 'INIT',
          data: {
          anecdotes
        }
      }
    );
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find(acnecodote => acnecodote.id === id);
      const updateAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }

      return state.map(anecdote => anecdote.id === id ? updateAnecdote : anecdote);
    case 'NEW_ANECDOTE':
      return [...state, action.data.anecdote];

    case 'INIT':
      return action.data.anecdotes

    default:
      return state
  }
}

export default reducer