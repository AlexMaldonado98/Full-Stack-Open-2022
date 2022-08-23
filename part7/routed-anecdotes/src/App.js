import { useEffect, useState } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import About from './components/About';
import Anecdote from './components/Anecdote';
import AnecdoteList from './components/AnecdoteList';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Menu from './components/Menu';
import { NotifComponent } from './components/NotifComponent';


const App = () => {
  
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const navigate = useNavigate();
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/');
    setNotification(`The anecdote "${anecdote.content}" was created`)
  }

  useEffect(() => {
    let timeout = null
    timeout = setTimeout(() => {
      setNotification(null);
    }, 10000);
    return () => {
      console.log(typeof timeout, timeout);
      window.clearTimeout(timeout)
    }
  },[notification])

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdote/:id')
  const anecdoteObjetive = match ? anecdotes.find(anecdote => anecdote.id ===  Number(match.params.id) ) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <NotifComponent message={notification} />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/anecdote/:id' element={<Anecdote anecdote={anecdoteObjetive}/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
