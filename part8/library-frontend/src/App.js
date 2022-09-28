import { useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import { LoginForm } from './components/LoginForm'
import NewBook from './components/NewBook'
import { Recommended } from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient();

  useEffect(() => {
    const token = window.localStorage.getItem('token-library')
    if (token) {
      setToken(token)
    }
  }, [])

  const saveToken = (token, page) => {
    setToken(token);
    setPage(page);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure that you want to log out?")) {
      setToken(null)
      setPage('authors')
      window.localStorage.removeItem('token-library')
      client.resetStore()
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}

      </div>

      <Authors show={page === 'authors'} >{token}</Authors>
      <Books show={page === 'books'} />
      <LoginForm show={page === 'login'} saveToken={saveToken} />
      {token && (
        <>
          <NewBook show={page === 'add'} />
          <Recommended show={page === 'recommend'} />
        </>
      )}

    </div>
  )
}

export default App
