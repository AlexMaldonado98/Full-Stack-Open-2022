import { useQuery } from "@apollo/client"
import {ALL_AUTHORS} from '../authors/queries.js'

const Authors = (props) => {
  const {data, loading} = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null
  }
  
  if (loading) return <div>loading...</div>

  const authors = data.allAuthors || []

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
    </div>
  )
}

export default Authors
