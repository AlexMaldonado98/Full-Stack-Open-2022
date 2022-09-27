import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../authors/queries";

const Books = (props) => {

  const {data, loading} = useQuery(ALL_BOOKS);
  const [filter, setFilter] = useState('all genres')

  if (!props.show) {
    return null
  }
  
  if (loading) return <div>loading...</div>
  
  const books = data?.allBooks || []

  const handleFilter = (e) => {
      setFilter(e.target.innerText)
  };

  return (
    <div>
      <h2>books</h2>
      <p>{`in genres ${filter}`}</p>
      <table >
        <tbody>
          <tr >
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {[...books].filter(book => {
            if(filter !== 'all genres'){
              return book.genres.includes(filter)
            }else{
              return book
            }
          }).map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={(e) => handleFilter(e)} >refactoring</button>
        <button onClick={(e) => handleFilter(e)} >agile</button>
        <button onClick={(e) => handleFilter(e)} >patterns</button>
        <button onClick={(e) => handleFilter(e)} >desing</button>
        <button onClick={(e) => handleFilter(e)} >crime</button>
        <button onClick={(e) => handleFilter(e)} >classic</button>
        <button onClick={(e) => handleFilter(e)} >all genres</button>
      </div>
    </div>
  )
}

export default Books
