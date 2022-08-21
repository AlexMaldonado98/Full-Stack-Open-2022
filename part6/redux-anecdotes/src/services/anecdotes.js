import axios from 'axios'

const URL = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
    const response = await axios.get(URL);
    return response.data;
}

export const createAnecdote = async (content) => {
    const newAnecdote ={
        content,
        votes: 0
    }

    const result = await axios.post(URL,newAnecdote);
    return result.data
}

export const updateAnecdote = async (anecdote) => {
    const updateAnecdote = {...anecdote, votes: anecdote.votes + 1 }
    const result = await axios.put(`${URL}/${anecdote.id}`,updateAnecdote)
    return result.data
}