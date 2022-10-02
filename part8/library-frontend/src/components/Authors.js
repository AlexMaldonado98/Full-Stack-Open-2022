import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from '../graphql/queries.js'
import { Birthday } from "./Birthday.js";



const Authors = (props) => {
  const { data, loading } = useQuery(ALL_AUTHORS);

  const authors = data?.allAuthors || []

  if (!props.show) {
    return null
  }

  if (loading) return <div>loading...</div>

  

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];

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
        {props.children && <Birthday authors={authors} />}
      </div>
    </div>
  )
}

export default Authors
