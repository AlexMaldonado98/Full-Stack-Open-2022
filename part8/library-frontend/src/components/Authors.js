import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react";
import { EDIT_AUTHOR } from "../authors/mutations.js";
import {ALL_AUTHORS} from '../authors/queries.js'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const {data, loading} = useQuery(ALL_AUTHORS);
  
  const [editAuthor] = useMutation(EDIT_AUTHOR,{
    refetchQueries:[{query:ALL_AUTHORS}]
  })

  if (!props.show) {
    return null
  }
  
  if (loading) return <div>loading...</div>

  const authors = data.allAuthors || []

  const submit = (e) => {
    e.preventDefault()
    editAuthor({variables: {name,born}})
    setName('')
    setBorn('')

  }
 
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || 'null'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <form onSubmit={submit} >
          <div>
            name
            <input type='text' value={name} onChange={({target}) => setName(target.value)} ></input>
          </div>
          <div>
            Born
            <input type='number' value={born} onChange={({target}) => setBorn(Number(target.value))} ></input>
          </div>
          <button>Update Author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
