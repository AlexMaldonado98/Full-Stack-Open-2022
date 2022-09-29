import { useState } from 'react'
import { ADD_BOOK } from '../authors/mutations'
import { ALL_BOOKS } from '../authors/queries'
import { useMutation } from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => console.log(error.graphQLErrors[0].message),
    update: (store, response) => {
      const dataInstore = store.readQuery({ query: ALL_BOOKS })
      console.log(dataInstore);
      store.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInstore,
          allBooks: [...dataInstore.allBooks, response.data.addBook]
        }
      })
    }
  })

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()
    try {
      addBook({ variables: { title, author, published, genres } })

    } catch (error) {
      console.log(error)

    }

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.toLowerCase()))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
