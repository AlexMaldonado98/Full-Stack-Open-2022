import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Filter } from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAll } from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAll().then((response) => {
      console.log(response);
      dispatch(initAnecdotes(response))
    })
  },[])

  return (
    <div>
      <Filter />
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App